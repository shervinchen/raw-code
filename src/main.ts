import { agent } from "./agent.ts";

const { text } = await agent.generate({ prompt: "What is the current time?" });

console.log(text);
