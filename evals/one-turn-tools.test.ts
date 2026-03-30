import assert from "node:assert";
import { describe, it } from "node:test";
import { generateText } from "ai";
import { ollamaQwen3_4b_instruct_q4_KM } from "../src/models.ts";
import { getSystemDateTimeTool } from "../src/tools/get-system-date-time.ts";

describe("One turn tools evals", () => {
  it("should call get-system-date-time tool", async () => {
    const prompt = "What is the current time?";
    const { toolCalls } = await generateText({
      model: ollamaQwen3_4b_instruct_q4_KM,
      prompt,
      tools: { get_system_date_time: getSystemDateTimeTool },
    });
    assert.ok(toolCalls.length > 0);
  });
});
