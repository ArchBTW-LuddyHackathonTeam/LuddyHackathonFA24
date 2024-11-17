import express from "express";
import DBInterface from "../db-interface";
import {Person} from "../db-types";
import { Request, Response } from "express-serve-static-core";
import { decodeToken, verifyToken } from "../utils/auth"
import Joi from "joi";

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", async (req, res) => {
    await getAllPeople(req, res)
    // #swagger.description = 'Get all people in the database'
});
router.post("/", async (req, res) => {
    await addPerson(req, res);
})
router.get("/first-name/:firstName", async (req, res) => {
    await getPeopleByFirstName(req, res)
    // #swagger.description = 'Get people with a specific first name from the database'
});
router.get("/last-name/:lastName", async (req, res) => {
    await getPeopleByLastName(req, res)
    // #swagger.description = 'Get people with a specific last name from the database'
});
router.get("/email/:email", async (req, res) => {
    await getPeopleByEmail(req, res)
    // #swagger.description = 'Get people with a specific email address from the database'
});
router.get("/username/:username", async (req, res) => {
    await getPeopleByUsername(req, res)
    // #swagger.description = 'Get people with a specific username from the database'
});
router.get("/phone-number/:phoneNumber", async (req, res) => {
    await getPeopleByPhoneNumber(req, res)
    // #swagger.description = 'Get people with a specific phone number from the database'
});
router.get("/me", verifyToken, (req, res) => {
  decodeToken(req.cookies.tk)
  .then(person => _db.getPeopleById(person.id))
  .then(people => {
    if (people.length == 0) return Promise.reject({ error: "An unexpected error occurred" })
    else return res.status(200).json(people[0])
  })
  .catch(res.status(400).json)
})
router.get("/:id", async (req, res) => {
    await getPeopleById(req, res)
    // #swagger.description = 'Get a person by their unique ID from the database'
});

async function getAllPeople(_req: Request, res: Response) {
    const _rows: Array<Person> = await _db.getAllPeople()

    res.send(_rows);
}

async function getPeopleById(_req: Request, res: Response){
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Person> = await _db.getPeopleById(_id);

    if(_rows.length == 0){
        res.status(404).send(`No such person with id: ${_id}`)
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByFirstName(_req: Request, res: Response){
    const _firstName: string = _req.params.firstName as any as string;

    const _rows: Array<Person> = await _db.getPeopleByFirstName(_firstName);

    if(_rows.length == 0){
        res.status(404).send(`No such person with first name: ${_firstName}`)
        return;
    }

    res.send(_rows);
}

async function getPeopleByLastName(_req: Request, res: Response){
    const _lastName: string = _req.params.lastName as any as string;

    const _rows: Array<Person> = await _db.getPeopleByLastName(_lastName);

    if(_rows.length == 0){
        res.status(404).send(`No such person with last name: ${_lastName}`)
        return;
    }

    res.send(_rows);
}

async function getPeopleByEmail(_req: Request, res: Response){
    const _email: string = _req.params.email as any as string;

    const _rows: Array<Person> = await _db.getPeopleByEmail(_email);

    if(_rows.length == 0){
        res.status(404).send(`No such person with email: ${_email}`)
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByUsername(_req: Request, res: Response){
    const _username: string = _req.params.username as any as string;

    const _rows: Array<Person> = await _db.getPeopleByUsername(_username);

    if(_rows.length == 0){
        res.status(404).send(`No such person with username: ${_username}`)
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByPhoneNumber(_req: Request, res: Response){
    const _phoneNumber: string = _req.params.phoneNumber as any as string;

    console.log("Decoded Phone Number:", _phoneNumber);

    const _rows: Array<Person> = await _db.getPeopleByPhoneNumber(_phoneNumber);

    if(_rows.length == 0){
        res.status(404).send(`No such person with phone number: ${_phoneNumber}`)
        return;
    }

    res.send(_rows);
}

async function addPerson(_req: Request, res: Response){
    const validate: Joi.ValidationResult = validatePerson(_req.body);

    if(validate.error){
        throw validate.error; //todo: better error handling for common mistakes
    }

    const person: Person = {
        id: -1,
        firstName: validate.value.firstName,
        lastName: validate.value.lastName,
        email: validate.value.email,
        username: validate.value.username,
        phoneNumber: validate.value.phoneNumber,
        locationId: validate.value.locationId,
        title: validate.value.title
    }

    const _row: Person = await _db.addPerson(person);

    res.send(_row);
}

function validatePerson(_body: any){
    const schema = Joi.object({
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().email().max(254).required(),
        username: Joi.string().max(32).required(),
        locationId: Joi.number().min(0),
        title: Joi.string().max(50),
        phoneNumber: Joi.string().max(50)
    })

    return schema.validate(_body);
}

export default router;
