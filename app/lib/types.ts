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

export interface ClaimVerificationData {
  id: string;
  raw_text: string;
  token_count: number;
  usage: ClaimUsage;
  claim_detail: ClaimDetail[];
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
