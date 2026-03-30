import { generateText, stepCountIs, tool } from "ai";
import { ollama } from "ollama-ai-provider-v2";
import { z } from "zod";

const res = await generateText({
  model: ollama("qwen3:4b-instruct-2507-q4_K_M"),
  prompt: "What time is it now?",
  stopWhen: stepCountIs(3),
  tools: {
    get_system_date_time: tool({
      description:
        "Return the system current date time. Useful to provide the current time to user.",
      inputSchema: z.object({}),
      execute() {
        return new Date().toLocaleString();
      },
    }),
  },
});

console.log(res);
