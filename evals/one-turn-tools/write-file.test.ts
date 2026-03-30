import assert from "node:assert";
import { describe, it } from "node:test";
import { stepCountIs, ToolLoopAgent } from "ai";
import { ollamaQwen3_4b_instruct_q4_KM } from "../../src/models.ts";
import { tools } from "../../src/tools/index.ts";
import { writeFileToolInputSchema } from "../../src/tools/write-file.tool.ts";

const agent = new ToolLoopAgent({
  model: ollamaQwen3_4b_instruct_q4_KM,
  stopWhen: stepCountIs(1),
  tools,
});

describe("Write file tool", () => {
  it("should call", async () => {
    const prompt =
      "create a new file called hello.txt with content 'Hello, World!'";
    const { toolCalls } = await agent.generate({ prompt });
    assert.doesNotThrow(() =>
      writeFileToolInputSchema.parse(toolCalls[0]?.input),
    );
    assert.ok(toolCalls.length > 0);
    assert.ok(toolCalls[0]?.toolName.includes("write_file"));
  });
});
