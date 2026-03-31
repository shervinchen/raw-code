import { createInterface } from "node:readline/promises";
import type { ModelMessage } from "ai";
import { render } from "ink";
import { createElement } from "react";
import { agent } from "./agent.ts";
import { App } from "./ui/app.tsx";

// const history: ModelMessage[] = [];
// const rl = createInterface(process.stdin, process.stdout);

// while (true) {
//   const ask = await rl.question("Ask: ");

//   if (!ask.trim()) break;

//   const userMessage: ModelMessage = { role: "user", content: ask };
//   const { response, text } = await agent.generate({
//     messages: [...history, userMessage],
//   });

//   console.log(text);
//   history.push(userMessage);
//   history.push(...response.messages);
// }

// rl.close();

render(createElement(App));
