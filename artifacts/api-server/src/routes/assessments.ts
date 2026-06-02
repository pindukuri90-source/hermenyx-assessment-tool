import { Router } from "express";
import { db } from "@workspace/db";
import { assessmentsTable, sectionResponsesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import {
  CreateAssessmentBody,
  UpdateAssessmentBody,
  SaveSectionResponseBody,
} from "@workspace/api-zod";

const router = Router();

router.post("/assessments", async (req, res) => {
  const parsed = CreateAssessmentBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const { firstName, lastName, email, company, jobTitle, industry } = parsed.data;
  const [assessment] = await db
    .insert(assessmentsTable)
    .values({ firstName, lastName, email, company, jobTitle, industry })
    .returning();
  return res.status(201).json(serializeAssessment(assessment));
});

router.get("/assessments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const [assessment] = await db
    .select()
    .from(assessmentsTable)
    .where(eq(assessmentsTable.id, id));
  if (!assessment) return res.status(404).json({ error: "Not found" });

  const sections = await db
    .select()
    .from(sectionResponsesTable)
    .where(eq(sectionResponsesTable.assessmentId, id));

  return res.json(serializeAssessmentDetail(assessment, sections));
});

router.patch("/assessments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const parsed = UpdateAssessmentBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const [updated] = await db
    .update(assessmentsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(assessmentsTable.id, id))
    .returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(serializeAssessment(updated));
});

router.put("/assessments/:id/sections/:sectionNum", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const sectionNum = parseInt(req.params.sectionNum, 10);
  if (isNaN(id) || isNaN(sectionNum)) return res.status(400).json({ error: "Invalid params" });

  const parsed = SaveSectionResponseBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const [existing] = await db
    .select()
    .from(sectionResponsesTable)
    .where(
      sql`${sectionResponsesTable.assessmentId} = ${id} AND ${sectionResponsesTable.sectionNum} = ${sectionNum}`
    );

  let section;
  if (existing) {
    [section] = await db
      .update(sectionResponsesTable)
      .set({ data: parsed.data.data, updatedAt: new Date() })
      .where(eq(sectionResponsesTable.id, existing.id))
      .returning();
  } else {
    [section] = await db
      .insert(sectionResponsesTable)
      .values({ assessmentId: id, sectionNum, data: parsed.data.data })
      .returning();
  }

  await db
    .update(assessmentsTable)
    .set({ updatedAt: new Date() })
    .where(eq(assessmentsTable.id, id));

  return res.json(serializeSection(section));
});

router.post("/assessments/:id/submit", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const [updated] = await db
    .update(assessmentsTable)
    .set({ status: "submitted", updatedAt: new Date() })
    .where(eq(assessmentsTable.id, id))
    .returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(serializeAssessment(updated));
});

router.post("/assessments/:id/checkout", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const [assessment] = await db
    .select()
    .from(assessmentsTable)
    .where(eq(assessmentsTable.id, id));
  if (!assessment) return res.status(404).json({ error: "Not found" });

  await db
    .update(assessmentsTable)
    .set({ status: "paid", updatedAt: new Date() })
    .where(eq(assessmentsTable.id, id));

  const sessionId = `session_${id}_${Date.now()}`;
  const baseUrl = process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : "http://localhost";
  const checkoutUrl = `${baseUrl}/assessment/${id}/confirmation?session=${sessionId}`;

  return res.json({ checkoutUrl, sessionId });
});

function serializeAssessment(a: typeof assessmentsTable.$inferSelect) {
  return {
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    company: a.company,
    jobTitle: a.jobTitle,
    industry: a.industry,
    status: a.status,
    createdAt: a.createdAt?.toISOString(),
    updatedAt: a.updatedAt?.toISOString() ?? null,
  };
}

function serializeSection(s: typeof sectionResponsesTable.$inferSelect) {
  return {
    id: s.id,
    assessmentId: s.assessmentId,
    sectionNum: s.sectionNum,
    data: s.data,
  };
}

function serializeAssessmentDetail(
  a: typeof assessmentsTable.$inferSelect,
  sections: (typeof sectionResponsesTable.$inferSelect)[]
) {
  return {
    ...serializeAssessment(a),
    results: a.results ?? null,
    roadmap: a.roadmap ?? null,
    sections: sections.map(serializeSection),
  };
}

export default router;
