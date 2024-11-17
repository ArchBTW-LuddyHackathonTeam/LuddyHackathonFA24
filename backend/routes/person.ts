import express from "express";
import cors from "cors";
import DBInterface from "../db-interface";
import {Person} from "../db-types";
import { Request, Response } from "express-serve-static-core";
import { decodeToken, verifyToken } from "../utils/auth"

const router = express();

//enable CORS for all routes
router.use(cors());

//Initialize db interface
const _db = new DBInterface();

router.get("/", async (req, res) => {
    await getAllPeople(req, res)
    // #swagger.description = 'Get all people in the database'
});
router.get("/first-name/:firstName", (req, res) => getPeopleByFirstName(req, res));
router.get("/last-name/:lastName", (req, res) => getPeopleByLastName(req, res));
router.get("/email/:email", (req, res) => getPeopleByEmail(req, res));
router.get("/username/:username", (req, res) => getPeopleByUsername(req, res));
router.get("/phone-number/:phoneNumber", (req, res) => getPeopleByPhoneNumber(req, res));
router.get("/me", verifyToken, (req, res) => {
  decodeToken(req.cookies.tk)
  .then(person => _db.getPeopleById(person.id))
  .then(people => {
    if (people.length == 0) return Promise.reject({ error: "An unexpected error occurred" })
    else return res.status(200).json(people[0])
  })
  .catch(res.status(400).json)
})
router.get("/:id", (req, res) => getPeopleById(req, res));

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

export default router;
