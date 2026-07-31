import { sha256Hex } from "./sha256.js";
import { canonicalJson } from "./canonical-json.js";
import type { Plan } from "../schemas/plan.js";

/**
 * Compute a deterministic SHA-256 hex digest for a Plan object.
 *
 * Uses canonical JSON serialization to ensure consistent hashing
 * regardless of object key ordering.
 *
 * @param plan The Plan object to hash
 * @returns 64-character hex string (SHA-256)
 */
export function planId(plan: Plan): string {
  return sha256Hex(canonicalJson(plan));
}
