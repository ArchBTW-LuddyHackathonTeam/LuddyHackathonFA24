import express from "express";
import DBInterface from "../db-interface";
import {Product} from '../db-types'
import { Request, Response } from "express-serve-static-core";

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", async (req, res) => {
    await getAllProducts(req, res)
    // #swagger.description = 'Get all products in the database'
});
router.get("/name/:name", async (req, res) => {
    await getProductByName(req, res)
    // #swagger.description = 'Get a product by its name from the database'
});
router.get("/cp-id/:contactPersonId", async (req, res) => {
    await getProductByContactPersonId(req, res)
    // #swagger.description = 'Get products associated with a specific contact person ID in the database'
});
router.get("/:id", async (req, res) => {
    await getProductById(req, res)
    // #swagger.description = 'Get a product by its ID from the database'
});

async function getAllProducts(_req: Request, res: Response){
    const _rows: Array<Product> = await _db.getAllProducts()

    res.send(_rows);
}

async function getProductById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Product> = await _db.getProductById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such product with id: ${_id}`)
        return;
    }

    res.send(_rows[0]);
}

async function getProductByName(_req: Request, res: Response){
    const _name: string = _req.params.name as any as string;

    const _rows: Array<Product> = await _db.getProductByName(_name);

    if(_rows.length == 0){
        res.status(404).send(`No such product name: ${_name}`)
        return;
    }

    res.send(_rows);
}

async function getProductByContactPersonId(_req: Request, res: Response){
    const _contactPersonId: number = _req.params.contactPersonId as any as number;

    const _rows: Array<Product> = await _db.getProductByContactPersonId(_contactPersonId);

    if(_rows.length == 0){
        res.status(404).send(`No such product contact person id: ${_contactPersonId}`)
        return;
    }

    res.send(_rows);
}

export default router;
