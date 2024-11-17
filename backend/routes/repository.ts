import express from "express";
import DBInterface from "../db-interface";
import {Repository} from '../db-types'
import { Request, Response } from "express-serve-static-core";
import { verifyToken } from "../utils/auth"

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", verifyToken, async (req, res) => {
    await getAllRepositories(req, res)
    // #swagger.description = 'Get all repositories in the database'
});
router.get("/name/:name", verifyToken, async (req, res) => {
    await getRepositoryByName(req, res)
    // #swagger.description = 'Get repository by its name in the database'
});
router.get("/cp-id/:contactPersonId", verifyToken, async (req, res) => {
    getRepositoryByContactPersonId(req, res)
    // #swagger.description = 'Get repositories affiliated associated with a contact person ID in the database'
});
router.get("/:id", verifyToken, async (req, res) => {
    getRepositoryById(req, res)
    // #swagger.description = 'Get repository by id in the database'
});

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
