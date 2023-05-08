import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { DynamicTool } from "langchain/tools";

export const tool = async (input: string) => {
  const model = new OpenAI({ temperature: 0 });
  const tools = [
    new DynamicTool({
      name: "FOO",
      description:
        "call this to get the value of foo. input should be an empty string.",
      func: async (input: string) => {
        console.log(`foo input is ${input}`);
        return "foo";
      },
    }),
    new DynamicTool({
      name: "BAR",
      description:
        "call this to get the value of bar. input should be a string: what is bar? or what is the value of bar? or something like that",
      func: async (input: string) => {
        console.log(`bar input is ${input}`);
        return 42;
      },
    }),
  ];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description"
  );

  console.log("Loaded agent.");
  console.log(`Executing with input "${input}"...`);

  return executor.call({ input });
};
