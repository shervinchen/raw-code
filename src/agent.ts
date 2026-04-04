import { stepCountIs, ToolLoopAgent } from "ai";
import { mcpClient } from "./mcp-client.ts";
import { zhipuGLMModel } from "./models.ts";
import { tools as internalTools } from "./tools/index.ts";

const mcpTools = await mcpClient.tools();

export const agent = new ToolLoopAgent({
  // model: ollamaQwen3_4b_instruct_q4_KM,
  model: zhipuGLMModel,
  stopWhen: stepCountIs(10),
  temperature: 0.1,
  // tools: { ...mcpTools, ...internalTools },
  tools: internalTools,
});
