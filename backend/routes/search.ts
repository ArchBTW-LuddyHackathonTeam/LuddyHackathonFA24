import express from "express";
import DBInterface from "../db-interface";
import {Person, Location, Product, Repository, PersonSearchResult} from '../db-types';
import { Request, Response } from "express-serve-static-core";

const router = express();

const _db = new DBInterface();

router.get("/", async (req, res) => {
    await search(req, res);
})

async function search(_req: Request, res: Response) {
    let result: Array<PersonSearchResult> = [];

    let people: Array<Person> = await _db.getAllPeople();

    for(let person of people){
        if(person.locationId){
            let location: Array<Location> = await _db.getLocationById(person.locationId);

            let productsRepositoryArr: Array<Product | Repository> = (await _db.getProductByContactPersonId(person.id))
                .concat(await _db.getProductByContactPersonId(person.id));

            if(location.length == 0){
                result.push({
                    person: person,
                    projects: productsRepositoryArr
                })
            }
        }
    }

    res.send(result);
}