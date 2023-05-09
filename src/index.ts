import * as dotenv from "dotenv";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Command } from "commander";
import { ChainValues } from "langchain/schema";
import { query } from "./query.ts";
import { loader } from "./loader.ts";

dotenv.config();

const rl = readline.createInterface({ input, output });

// creating a command instance
const program = new Command();

// creating tool
program
  .name("Docsearch")
  .description("A CLI tool for searching a text")
  .version("1.0.0");

// adding command
program
  .command("chat")
  .description("Interactive mode")
  .action(async () => {
    while (true) {
      const q = await rl.question("How can I help?");
      const answer: ChainValues = await query(q);
      console.log(`Answer: ${answer.text}`);
    }
  });

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

program.parse(process.argv);
