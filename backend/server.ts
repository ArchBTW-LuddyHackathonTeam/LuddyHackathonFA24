// src/server.ts
import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors());

// ...rest of your backend code