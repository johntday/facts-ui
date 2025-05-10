import { pgTable, text, serial, integer, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Claim verification schemas
export const claimVerification = pgTable("claim_verification", {
  id: serial("id").primaryKey(),
  raw_text: text("raw_text").notNull(),
  token_count: integer("token_count").notNull(),
  usage: jsonb("usage").notNull(),
  created_at: text("created_at").notNull().default("NOW()"),
});

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  verification_id: integer("verification_id")
    .notNull()
    .references(() => claimVerification.id),
  claim_id: integer("claim_id").notNull(),
  claim: text("claim").notNull(),
  checkworthy: boolean("checkworthy").notNull(),
  checkworthy_reason: text("checkworthy_reason"),
  origin_text: text("origin_text").notNull(),
  start: integer("start").notNull(),
  end: integer("end").notNull(),
  factuality: decimal("factuality").notNull(),
});

export const queries = pgTable("queries", {
  id: serial("id").primaryKey(),
  claim_id: integer("claim_id")
    .notNull()
    .references(() => claims.id),
  query: text("query").notNull(),
});

export const evidences = pgTable("evidences", {
  id: serial("id").primaryKey(),
  claim_id: integer("claim_id")
    .notNull()
    .references(() => claims.id),
  text: text("text").notNull(),
  url: text("url").notNull(),
  reasoning: text("reasoning").notNull(),
  relationship: text("relationship").notNull(),
});

// Insert schemas
export const insertClaimVerificationSchema = createInsertSchema(claimVerification).omit({
  id: true,
});

export const insertClaimSchema = createInsertSchema(claims).omit({
  id: true,
});

export const insertQuerySchema = createInsertSchema(queries).omit({
  id: true,
});

export const insertEvidenceSchema = createInsertSchema(evidences).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertClaimVerification = z.infer<typeof insertClaimVerificationSchema>;
export type ClaimVerification = typeof claimVerification.$inferSelect;

export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;

export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type Query = typeof queries.$inferSelect;

export type InsertEvidence = z.infer<typeof insertEvidenceSchema>;
export type Evidence = typeof evidences.$inferSelect;

// Extended types for the application
export type ModelUsage = {
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
};

export type ClaimUsage = {
  decomposer: ModelUsage;
  checkworthy: ModelUsage;
  query_generator: ModelUsage;
  evidence_crawler: ModelUsage;
  claimverify: ModelUsage;
};

export type ClaimEvidence = {
  claim: string;
  text: string;
  url: string;
  reasoning: string;
  relationship: "SUPPORTS" | "REFUTES" | "IRRELEVANT";
};

export type ClaimDetail = {
  id: number;
  claim: string;
  checkworthy: boolean;
  checkworthy_reason: string;
  origin_text: string;
  start: number;
  end: number;
  queries: string[];
  evidences: ClaimEvidence[];
  factuality: number;
};

export type ClaimVerificationData = {
  id: string;
  raw_text: string;
  token_count: number;
  usage: ClaimUsage;
  claim_detail: ClaimDetail[];
};
