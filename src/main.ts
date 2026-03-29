import { generateText } from "ai";
import { ollama } from "ollama-ai-provider-v2";

const res = await generateText({
  model: ollama("qwen3:4b-instruct-2507-q4_K_M"),
  prompt: "What is the meaning of life?",
});

console.log(res);
