import * as z from "zod";
import { createAgent, tool } from "langchain";
import { ChatGroq } from "@langchain/groq";
import "@/lib/envConfig";

const getWeatherTool = tool(({ city }) => `It's always rainy in ${city}`, {
  name: "get_weather",
  description: "Get weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey: process.env.GROQ_API_KEY!,
  temperature: 0,
  maxTokens: 10000,
  maxRetries: 1,
});

const agent = createAgent({
  model: llm,
  tools: [getWeatherTool],
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in London?" }],
  })
);
