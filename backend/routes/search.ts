import express from "express";
import DBInterface from "../db-interface";
import {Person, Location, Product, Repository, PersonSearchResult} from '../db-types';
import { Request, Response } from "express-serve-static-core";
import FuzzySearch from "fuzzy-search";
import Joi from "joi";

const router = express();

const _db = new DBInterface();

router.get("/", async (req, res) => {
    await search(req, res);
})

async function collectResult() {
    let result: Array<PersonSearchResult> = [];

    let people: Array<Person> = await _db.getAllPeople();

    for (let person of people) {
        let location: Array<Location> = [];
        if (person.locationId) {
            location = await _db.getLocationById(person.locationId);
        }

        let productsRepositoryArr: Array<Product | Repository> = (await _db.getProductByContactPersonId(person.id))
            .concat(await _db.getProductByContactPersonId(person.id));

        if (location.length == 0) {
            result.push({
                person: person,
                projects: productsRepositoryArr
            })
        } else {
            result.push({
                person: person,
                location: location[0],
                projects: productsRepositoryArr
            });
        }
    }
    return result;
}

async function search(_req: Request, res: Response) {
    let body = _req.body;

    let validate: Joi.ValidationResult = validateBody(body);

    if(validate.error){
        throw validate.error;
    }

    const query: string = body.searchQuery;

    let result = await collectResult();

    let haystack: {
        projects: (Product | Repository)[];
        person: Person;
        location?: Location;
        searchableText: string
    }[] = result.map(x => ({
        ...x,
        searchableText: [
            x.person.firstName,
            x.person.lastName,
            x.person.title,
            ...x.projects.map(project => project.name || ""),
            ...x.projects.map(project => project.description || "")
        ].join(" ")
    }));

    const searcher = new FuzzySearch(haystack, ["searchableText"], {
        caseSensitive: false,
        sort: true
    })

    const searchResult = searcher.search(query);

    console.log(searchResult);

    res.send(searchResult.map(({searchableText, ...rest}) => rest))
}

function validateBody(_body: any): Joi.ValidationResult {
    const schema = Joi.object({
        searchQuery: Joi.string().required(),
        options: Joi.array().items(Joi.string().valid("product", "repository", "firstName", "lastName", "title"))
    })

    return schema.validate(_body);
}

export default router;