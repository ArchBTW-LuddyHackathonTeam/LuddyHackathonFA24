import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
// import Person from '../db-interface'
import Location from '../db-interface'
// import Product from '../db-interface'
// import Repository from '../db-interface'
import { Request, Response } from "express-serve-static-core";

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", (req, res) => getAllLocations(req, res));
router.get("/:id", (req, res) => getLocationById(req, res));

async function getAllLocations(_req: Request, res: Response){
    const _rows: Array<Location> = await _db.getAllLocations()

    res.send(_rows);
}

async function getLocationById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Location> = await _db.getLocationById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such location with id ${_id}`)
        return;
    }

    res.send(_rows[0]);
}

export default router;