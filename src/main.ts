import { agent } from "./agent.ts";

const res = await agent.generate({
  prompt: "Summarize package.json and write it into README.md",
});

console.log(res.text);
