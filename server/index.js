import express from "express";
import cors from "cors";    
import dotenv from 'dotenv';
dotenv.config();
import multer from "multer";
import path from "path";
import { QdrantClient } from "@qdrant/js-client-rest";

import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { QdrantVectorStore } from "@langchain/qdrant";
import { InferenceClient } from '@huggingface/inference';

const hf = new InferenceClient(process.env.HUGGINGFACEHUB_API_KEY);
// const llm = new HuggingFaceInference({
//   apiKey: process.env.HUGGINGFACEHUB_API_KEY, // your HuggingFace API key
//   model: "google/flan-t5-large", // Use a model compatible with the 'text-generation' task
//   provider: "hf-inference",
// });

const api_key = process.env.HUGGINGFACE_API_KEY;
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: api_key, 
  model: "sentence-transformers/all-MiniLM-L6-v2",
    provider: process.env.HF_PROVIDER,
});
  const client = new QdrantClient({url:"http://localhost:6333"});
import {Queue} from "bullmq";

const queue = new Queue('fileUploadQueue',{
    connection:{
    host:"localhost",
    port:6379,

}
})
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
         cb(null, Date.now() + ext);
       // cb(null,Date.now()+'-'+file.originalname);
    },
});
const upload = multer({storage:storage});
const app=express();
app.use(cors());




app.get("/",(req,res)=>{
    res.send("Hello from server");
});
app.post("/upload/pdf",upload.single('pdf'),async(req,res)=>{
   await queue.add("file-ready",JSON.stringify({
        filename: req.file.filename,
        destination:req.file.destination,
        path:req.file.path
    }))
    res.json({"status":"File uploaded successfully"});
});

app.get("/chat",async (req,res)=>{
    //const {query} = req.query;
  const  query=req.query.message;
      //create a vector store
   const vectorStore = await QdrantVectorStore.fromExistingCollection(
     
       embeddings,{
          client, 
   
       collectionName:"pdf_chunks",
   });
   const ret = vectorStore.asRetriever({
    k:2,
   });
   const results = await ret.invoke(query);
const context = results.map((r)=>r.pageContent).join("\n");
   //console.log("Context:",context);
   const systemPrompt = `You are a helpful AI assistant who answers the user query based on the available context from pdf file.
   context: ${context} Question: ${query}`;

   
const llm = await hf.chatCompletion({
    provider: "hf-inference",
    model: "HuggingFaceTB/SmolLM3-3B",
    messages: [
        {
            role: "user",
            content:systemPrompt,
        },
    ],
});


const answer = llm.choices[0].message.content;
   console.log("Answer:",llm.choices[0].message.content);

  res.json({ answer, sources: results });

})

app.listen(8000,()=>console.log("server started on port 8000"));