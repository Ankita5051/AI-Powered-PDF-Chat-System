import {Worker} from "bullmq";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
//import {CharacterTextSplitter} from "@langchain/textsplitters";
import { QdrantClient } from "@qdrant/js-client-rest";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey:process.env.HUGGINGFACEHUB_API_KEY, 
  model: "sentence-transformers/all-MiniLM-L6-v2",
   provider:process.env.HF_PROVIDER,
});
  const client = new QdrantClient({url:"http://localhost:6333"});
const worker =new Worker('fileUploadQueue',async (job)=>{
   // console.log("Processing job:",job.id,job.data);
   const data = JSON.parse(job.data);
   //path: data.path,
   //read the pdf from the path
   //chunk the pdf into 1000 byte chunks
   //call the openai api to embed the chunks
   // store the chunk into vector db qdrant

   //loading pdf
   const loader = new PDFLoader(data.path);
   const docs = await loader.load();
 

   //create a text splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 50,      // max size of chunk
  chunkOverlap: 10,   // overlap between chunks
});

   // const texts = await textSplitter.splitText(docs);
  const  texts = splitter.splitDocuments(docs)
  texts.then(d=>{
    console.log(d.map(d => d.pageContent));
  })


   //create a vector store
const vectorStore = await QdrantVectorStore.fromExistingCollection(
  
    embeddings,{
       client, 

    collectionName:"pdf_chunks",
});
 await vectorStore.addDocuments(docs);
    console.log("Document added to qdrant");
    return Promise.resolve();
},
{concurrency:100,connection:{
    host:"localhost",
    port:6379,

}});

