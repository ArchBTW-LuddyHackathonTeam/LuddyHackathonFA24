import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
import {Location} from '../db-types'
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
router.get("/stringify", async (req, res) => {
    await stringifyAllLocations(req, res);
    // #swagger.description = 'Get all stringified locations'
});
router.get("/stringify/city/:city", async (req, res) => {
    await stringifyLocation(req, res, getLocationByCity);
    // #swagger.description = 'Get stringified locations filtered by city'
});
router.get("/stringify/region/:region", async (req, res) => {
    await stringifyLocation(req, res, getLocationByRegion);
    // #swagger.description = 'Get stringified locations filtered by region'
});
router.get("/stringify/country/:country", async (req, res) => {
    await stringifyLocation(req, res, getLocationByCountry);
    // #swagger.description = 'Get stringified locations filtered by country'
});
router.get("/stringify/:id", async (req, res) => {
    await stringifyLocation(req, res, getLocationById);
    // #swagger.description = 'Get stringified locations filtered by id'
});
router.get("/city/:city", async (req, res) => {
    await getLocationByCity(req, res)
    // #swagger.description = 'Get locations filtered by city'
});
router.get("/region/:region", async (req, res) => {
    await getLocationByRegion(req, res)
    // #swagger.description = 'Get locations filtered by region'
});
router.get("/country/:country", async (req, res) => {
    await getLocationByCountry(req, res)
    // #swagger.description = 'Get locations filtered by country'
});
router.get("/:id", async (req, res) => {
    await getLocationById(req, res)
    // #swagger.description = 'Get locations filtered by id'
});


function formatLocation(location: Location): string {
    const { streetAddress, secondaryAddress, city, region, zipCode, country } = location;
    const firstLine = [streetAddress, secondaryAddress].filter(Boolean).join(" ");
    const secondLine = [
        city,
        region,
        zipCode,
    ]
        .filter(Boolean)
        .join(", ");
    const thirdLine = country || "";

    return [firstLine, secondLine, thirdLine].filter(Boolean).join("\n");
}

function stringifyResponse(data: Array<Location> | Location): Array<{ address: string }> | { address: string } {
    if (Array.isArray(data)) {
        if (data.length === 1) {
            return { address: formatLocation(data[0]) };
        }
        return data.map(location => ({ address: formatLocation(location) }));
    }
    return { address: formatLocation(data) };
}

async function stringifyAllLocations(_req: Request, res: Response){
    const _rows: Array<Location> = await _db.getAllLocations()

    res.json(stringifyResponse(_rows));
}

async function stringifyLocation(req: Request, res: Response, handler: Function) {
    const originalJson = res.json.bind(res);
    res.json = (data: any) => originalJson(stringifyResponse(data));
    await handler(req, res);
}

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