import * as dotenv from "dotenv";
import { Command } from "commander";
import { ChainValues } from "langchain/schema";
import { agent } from "./agent.ts";
import { loader } from "./loader.ts";

dotenv.config();

// const FILE_PATH = "./assets/Wardley Maps - Simon Wardley.pdf";
// const QUESTION = "What is this book about? Give me a 3 sentence summary.";

// index.js

// creating a command instance
const program = new Command();

// creating tool
program
  .name("Chatbot")
  .description("A CLI tool for searching a text")
  .version("1.0.0");

// adding command
program
  .command("query")
  .description("Ask a question")
  .argument("<question>", "Question")
  .action(async (q: string) => {
    console.log(q);
    const answer: ChainValues = await agent(q);
    console.log(`Answer: ${answer.text}`);
  });

program
  .command("load")
  .description("Load a document")
  .argument("<path>", "Path to document")
  .action(async (path: string) => {
    console.log(path);
    const store = await loader(path);
    console.log(`Loaded the store! ${store}`);
  });

program.parse();

// console.log(QUESTION);

// loader(FILE_PATH).then(async (store) => {
//   console.log(`Loaded the store! ${store}`);

//   const answer: ChainValues = await agent(QUESTION);
//   console.log(`Answer: ${answer.text}`);
// });
