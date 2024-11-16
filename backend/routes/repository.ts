import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
import Repository from '../db-interface'
import { Request, Response } from "express-serve-static-core";

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", (req, res) => getAllRepositories(req, res));
router.get("/name/:name", (req, res) => getRepositoryByName(req, res));
router.get("/cp-id/:contactPersonId", (req, res) => getRepositoryByContactPersonId(req, res));
router.get("/:id", (req, res) => getRepositoryById(req, res));

async function getAllRepositories(_req: Request, res: Response){
    const _rows: Array<Repository> = await _db.getAllRepositories()

    res.send(_rows);
}

async function getRepositoryById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Repository> = await _db.getRepositoryById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such repository with id: ${_id}`)
        return;
    }

    res.send(_rows[0]);
}

async function getRepositoryByName(_req: Request, res: Response){
    const _name: string = _req.params.name as any as string;

    const _rows: Array<Repository> = await _db.getRepositoryByName(_name);

    if(_rows.length == 0){
        res.status(404).send(`No such repository with name: ${_name}`)
        return;
    }

    res.send(_rows);
}

async function getRepositoryByContactPersonId(_req: Request, res: Response){
    const _contactPersonId: number = _req.params.contactPersonId as any as number;

    const _rows: Array<Repository> = await _db.getRepositoryByContactPersonId(_contactPersonId);

    if(_rows.length == 0){
        res.status(404).send(`No such repository with contact person id: ${_contactPersonId}`)
        return;
    }

    res.send(_rows);
}

export default router;