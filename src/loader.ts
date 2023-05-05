import { PDFLoader } from "langchain/document_loaders";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import { PineconeClient } from "@pinecone-database/pinecone";

export async function loader(contentUrl: string): Promise<PineconeStore> {
  // Create the Pinecone client
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });
  console.log(client);
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);

  // Create embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });

  // Load the data
  const loader = new PDFLoader(contentUrl);
  const data = await loader.load();

  console.log(`You have ${data.length} document(s) in your data`);
  console.log(
    `There are ${data[0].pageContent.length} characters in your document`
  );

  // Chunk the data
  const text_splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  const texts = await text_splitter.splitDocuments(data);

  console.log(`Now you have ${texts.length} documents`);

  return PineconeStore.fromTexts(
    texts.map((t) => t.pageContent),
    [],
    embeddings,
    { pineconeIndex }
  );
}
