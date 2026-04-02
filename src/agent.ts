import { stepCountIs, ToolLoopAgent } from "ai";

import { zhipuGLMModel } from "./models.ts";
import { tools } from "./tools/index.ts";

export const agent = new ToolLoopAgent({
  // model: ollamaQwen3_4b_instruct_q4_KM,
  model: zhipuGLMModel,
  stopWhen: stepCountIs(10),
  temperature: 0.1,
  tools,
});
