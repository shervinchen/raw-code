import OpenAI from "openai";

const openai = new OpenAI({ baseURL: "http://localhost:11434/v1", apiKey: "" });

const res = await openai.responses.create({
  model: "qwen3:4b-instruct-2507-q4_K_M",
  input: "hello",
});

console.log(res);
