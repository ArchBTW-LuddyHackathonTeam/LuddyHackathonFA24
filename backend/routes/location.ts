import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
import Location from '../db-interface'
import { Request, Response } from "express-serve-static-core";

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", async (req, res) => {
    await getAllLocations(req, res)
    // #swagger.description = 'Get all locations in the database'
});
router.get("/city/:city", (req, res) => getLocationByCity(req, res));
router.get("/region/:region", (req, res) => getLocationByRegion(req, res));
router.get("/country/:country", (req, res) => getLocationByCountry(req, res));
router.get("/:id", (req, res) => getLocationById(req, res));

async function getAllLocations(_req: Request, res: Response){
    const _rows: Array<Location> = await _db.getAllLocations()

    res.send(_rows);
}

async function getLocationById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Location> = await _db.getLocationById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such location with id: ${_id}`)
        return;
    }

    res.send(_rows[0]);
}

async function getLocationByCity(_req: Request, res: Response){
    const _city: string = _req.params.city as any as string;

    const _rows: Array<Location> = await _db.getLocationByCity(_city);

    if(_rows.length == 0){
        res.status(404).send(`No such location with city: ${_city}`)
        return;
    }

    res.send(_rows);
}

async function getLocationByRegion(_req: Request, res: Response){
    const _region: string = _req.params.region as any as string;

    const _rows: Array<Location> = await _db.getLocationByRegion(_region);

    if(_rows.length == 0){
        res.status(404).send(`No such location with region: ${_region}`)
        return;
    }

    res.send(_rows);
}

async function getLocationByCountry(_req: Request, res: Response){
    const _country: string = _req.params.country as any as string;

    const _rows: Array<Location> = await _db.getLocationByCountry(_country);

    if(_rows.length == 0){
        res.status(404).send(`No such location with country: ${_country}`)
        return;
    }

    res.send(_rows);
}

export default router;