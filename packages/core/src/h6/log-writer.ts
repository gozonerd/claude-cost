import fs from "fs/promises";
import { H6Record } from "./schema.js";

/**
 * JSONL log writer for H6 records
 *
 * Appends H6 records to step-history.jsonl (or env var CC_H6_LOG_PATH).
 * Atomic-ish append using fs.appendFile; errors are propagated to caller
 * (which buffers on failure).
 */

/**
 * Get the log file path
 *
 * Priority:
 * 1. env CC_H6_LOG_PATH if set
 * 2. "step-history.jsonl" in process.cwd()
 */
function getLogPath(): string {
  return process.env.CC_H6_LOG_PATH || "step-history.jsonl";
}

/**
 * Serialized write chain.
 *
 * H6 hooks fire on Claude Code lifecycle events and their writes are wrapped in
 * a wall-clock budget (see budget.ts): when a write exceeds its budget, the hook
 * returns while the underlying fs.appendFile is still in flight. If the next hook
 * (e.g. onPostToolUse) then appends concurrently, the two appends can land out of
 * order and the JSONL log records a cost_actual line before its cost_estimate.
 * Chaining every append through a single FIFO promise guarantees records are
 * written in call order regardless of per-call timing. A rejected write is
 * swallowed *for the chain only* (so one failure does not wedge all later writes);
 * the caller still receives its own rejection and buffers per the H6 contract.
 */
let writeChain: Promise<void> = Promise.resolve();

/**
 * writeRecord - Append a single record to the JSONL log
 *
 * Appends are serialized in call order via writeChain so concurrent hook
 * invocations cannot interleave or reorder lines.
 *
 * @param record H6Record to write
 * @throws On file I/O errors (EACCES, ENOSPC, etc.)
 */
export async function writeRecord(record: H6Record): Promise<void> {
  const path = getLogPath();
  const line = JSON.stringify(record) + "\n";

  const doWrite = writeChain.then(() => fs.appendFile(path, line, "utf-8"));
  // Keep the chain progressing even if this write rejects; the caller still
  // awaits doWrite and sees the real error.
  writeChain = doWrite.then(
    () => undefined,
    () => undefined,
  );
  await doWrite;
}
