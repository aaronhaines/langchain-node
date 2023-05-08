import * as dotenv from "dotenv";
import { Command } from "commander";
import { ChainValues } from "langchain/schema";
import { query } from "./query.ts";
import { loader } from "./loader.ts";
import { tool } from "./agent.ts";

dotenv.config();

// creating a command instance
const program = new Command();

// creating tool
program
  .name("Docsearch")
  .description("A CLI tool for searching a text")
  .version("1.0.0");

// adding command
program
  .command("query")
  .description("Ask a question")
  .argument("<question>", "Question")
  .action(async (q: string) => {
    console.log(q);
    const answer: ChainValues = await query(q);
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

program
  .command("tool")
  .description("Use a tool")
  .argument("<input>", "Input to tool")
  .action(async (input: string) => {
    const result = await tool(input);
    console.log(`Got output ${result.output}`);
  });

program.parse(process.argv);
