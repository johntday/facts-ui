// Define types directly here since we're transitioning
// This helps avoid path resolution issues during the migration

export interface ModelUsage {
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
}

export interface ClaimUsage {
  decomposer: ModelUsage;
  checkworthy: ModelUsage;
  query_generator: ModelUsage;
  evidence_crawler: ModelUsage;
  claimverify: ModelUsage;
}

export interface ClaimEvidence {
  claim: string;
  text: string;
  url: string;
  reasoning: string;
  relationship: "SUPPORTS" | "REFUTES" | "IRRELEVANT";
}

export interface ClaimDetail {
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
}

export interface ClaimSummary {
  num_claims: number;
  num_checkworthy_claims: number;
  num_verified_claims: number;
  num_supported_claims: number;
  num_refuted_claims: number;
  num_controversial_claims: number;
  factuality: number;
}

export interface ClaimVerificationData {
  id: string;
  raw_text: string;
  token_count: number;
  usage: ClaimUsage;
  claim_detail: ClaimDetail[];
  summary: ClaimSummary;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}
