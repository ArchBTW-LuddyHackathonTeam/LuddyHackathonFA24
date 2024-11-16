import express from "express";
import cors from "cors";

const router = express();

//enable CORS for all routes
router.use(cors());

export default router;