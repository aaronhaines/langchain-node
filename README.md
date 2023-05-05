# langchain-node

Query a local PDF using langchain, OpenAI, Pinecone

# What's included

- Typescript
- .env file configuration
- ESLint and Prettier for formatting
- Turborepo to quickly run build scripts
- `tsup` to bundle Typescript code
- `tsx` to quickly run compiled code

# How to use

- Follow Pinecone docs to set up a Pinecone index
- Clone this repository
- `npm install`
- Add API keys to .env
- Create assets directory
- Add a PDF in assets
- `npx turbo run build lint format` to run build scripts quickly in parallel

# To run the app

- `npm start load "./assets/[filepath]"` to push docs up to Pinecone using OpenAI embeddings
- `npm start query [ prompt ]` to ask a question about the PDF content
