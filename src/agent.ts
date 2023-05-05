import { OpenAI } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { loadQAStuffChain } from "langchain/chains";
import { PineconeStore } from "langchain/vectorstores";
import { PineconeClient } from "@pinecone-database/pinecone";
import { ChainValues } from "langchain/schema";

export async function agent(query: string): Promise<ChainValues> {
  // Create the Pinecone client
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);

  // Create the LLM
  const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

  // Create embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const docsearch = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  // Query the docs
  const docs = await docsearch.similaritySearch(query, 3);
  
  // Answer the question
  const chain = loadQAStuffChain(llm);
  return chain.call({
    input_documents: docs,
    question: query,
  });
}
