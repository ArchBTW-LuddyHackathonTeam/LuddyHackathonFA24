import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
import Person from '../db-interface'
// import Location from '../db-interface'
// import Product from '../db-interface'
// import Repository from '../db-interface'
import { Request, Response } from "express-serve-static-core";

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", (req, res) => getAllPeople(req, res));
router.get("/:id", (req, res) => getPeopleById(req, res));

async function getAllPeople(_req: Request, res: Response) {
    const _rows: Array<Person> = await _db.getAllPeople()

    res.send(_rows);
}

async function getPeopleById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Person> = await _db.getPeopleById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such person with id ${_id}}`)
        return;
    }

    res.send(_rows[0]);
}

export default router;