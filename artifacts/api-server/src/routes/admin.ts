import { Router } from "express";
import { db } from "@workspace/db";
import { assessmentsTable, sectionResponsesTable } from "@workspace/db";
import { eq, sql, count } from "drizzle-orm";
import { SendResultsBody, ListAdminAssessmentsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/admin/assessments", async (req, res) => {
  const parsed = ListAdminAssessmentsQueryParams.safeParse(req.query);
  const status = parsed.success ? parsed.data.status : undefined;

  let query = db.select().from(assessmentsTable);
  const assessments = status
    ? await db.select().from(assessmentsTable).where(eq(assessmentsTable.status, status))
    : await db.select().from(assessmentsTable);

  const sectionCounts = await db
    .select({
      assessmentId: sectionResponsesTable.assessmentId,
      count: count(sectionResponsesTable.id),
    })
    .from(sectionResponsesTable)
    .groupBy(sectionResponsesTable.assessmentId);

  const countMap = new Map(sectionCounts.map((r) => [r.assessmentId, Number(r.count)]));

  const result = assessments.map((a) => ({
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    company: a.company,
    jobTitle: a.jobTitle,
    industry: a.industry,
    status: a.status,
    sectionsCompleted: countMap.get(a.id) ?? 0,
    createdAt: a.createdAt?.toISOString(),
  }));

  result.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());

  return res.json(result);
});

router.get("/admin/assessments/:id", async (req, res) => {
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

  return res.json({
    id: assessment.id,
    firstName: assessment.firstName,
    lastName: assessment.lastName,
    email: assessment.email,
    company: assessment.company,
    jobTitle: assessment.jobTitle,
    industry: assessment.industry,
    status: assessment.status,
    results: assessment.results ?? null,
    roadmap: assessment.roadmap ?? null,
    createdAt: assessment.createdAt?.toISOString(),
    updatedAt: assessment.updatedAt?.toISOString() ?? null,
    sections: sections.map((s) => ({
      id: s.id,
      assessmentId: s.assessmentId,
      sectionNum: s.sectionNum,
      data: s.data,
    })),
  });
});

router.post("/admin/assessments/:id/results", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const parsed = SendResultsBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const [updated] = await db
    .update(assessmentsTable)
    .set({
      results: parsed.data.results,
      roadmap: parsed.data.roadmap,
      status: "completed",
      updatedAt: new Date(),
    })
    .where(eq(assessmentsTable.id, id))
    .returning();

  if (!updated) return res.status(404).json({ error: "Not found" });

  return res.json({
    id: updated.id,
    firstName: updated.firstName,
    lastName: updated.lastName,
    email: updated.email,
    company: updated.company,
    jobTitle: updated.jobTitle,
    industry: updated.industry,
    status: updated.status,
    createdAt: updated.createdAt?.toISOString(),
    updatedAt: updated.updatedAt?.toISOString() ?? null,
  });
});

router.get("/admin/stats", async (_req, res) => {
  const allAssessments = await db.select({ status: assessmentsTable.status }).from(assessmentsTable);

  const stats = { total: 0, draft: 0, submitted: 0, paid: 0, approved: 0, completed: 0 };
  for (const a of allAssessments) {
    stats.total++;
    const s = a.status as keyof typeof stats;
    if (s in stats) stats[s]++;
  }

  return res.json(stats);
});

export default router;
