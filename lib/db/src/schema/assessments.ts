import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const assessmentsTable = pgTable("assessments", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  jobTitle: text("job_title").notNull(),
  industry: text("industry"),
  status: text("status").notNull().default("draft"),
  results: text("results"),
  roadmap: text("roadmap"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertAssessmentSchema = createInsertSchema(assessmentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  results: true,
  roadmap: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessmentsTable.$inferSelect;

export const sectionResponsesTable = pgTable("section_responses", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessmentsTable.id),
  sectionNum: integer("section_num").notNull(),
  data: jsonb("data").notNull().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertSectionResponseSchema = createInsertSchema(sectionResponsesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSectionResponse = z.infer<typeof insertSectionResponseSchema>;
export type SectionResponse = typeof sectionResponsesTable.$inferSelect;
