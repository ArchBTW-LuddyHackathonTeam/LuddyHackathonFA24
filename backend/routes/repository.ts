import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
// import Person from '../db-interface'
// import Location from '../db-interface'
// import Product from '../db-interface'
import Repository from '../db-interface'
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", (req, res) => getAllRepositories(req, res));

async function getAllRepositories(_req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>){
    const _rows: Array<Repository> = await _db.getAllRepositories()

    res.send(_rows);
}

export default router;