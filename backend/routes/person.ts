import express from "express";
import DBInterface from "../db-interface";
import {Person} from "../db-types";
import {Request, Response} from "express-serve-static-core";
import {createToken, decodeToken, generateSalt, hashPassword, verifyToken} from "../utils/auth";
import signup from "../utils/signupSchema";

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", verifyToken, async (req, res) => {
    await getAllPeople(req, res);
    /*
  #swagger.summary = 'Retrieve all people from the database'
  #swagger.description = 'This endpoint fetches a list of all people in the database.'

  #swagger.responses[200] = {
    description: 'List of all people.',
    schema: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe123',
        phoneNumber: '+1234567890',
        locationId: 1,
        title: 'Software Engineer'
      }
    ]
  }

  #swagger.responses[500] = {
    description: 'Internal server error.',
    schema: {
      error: 'Error message describing the issue.'
    }
  }
*/

});
router.post("/", (req, res) => {
    const salt = generateSalt();
    signup.validateAsync({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        locationId: req.body.locationId,
        title: req.body.title
    })
        .then(body => Promise.all([_db.addPerson(body as Person), hashPassword(req.body.password, salt)]))
        .then(body => _db.addPersonPasswordHashById(body[0].id, body[1], salt))
        .then(body => createToken({id: body.id, firstName: body.firstName, lastName: body.lastName} as Person))
        .then(token => res.status(200).cookie("tk", token, {maxAge: 604800000, httpOnly: true}).json({success: true}))
        .catch(message => {
            res.status(401).json({error: message.message});
        });
    /*
  #swagger.summary = 'Add a person to the database'
  #swagger.description = 'This endpoint adds a new person to the database. The request body must comply with the validation schema.'

  #swagger.parameters['body'] = {
    in: 'body',
    description: 'The details of the person to add.',
    required: true,
    schema: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'johndoe@example.com',
      $username: 'johndoe123',
      $phoneNumber: '+1234567890',
      $locationId: 1,
      $title: 'Software Engineer'
    }
  }

  #swagger.responses[200] = {
    description: 'Person successfully added and token generated.',
    schema: {
      success: true,
      token: '<jwt-token>'
    }
  }

  #swagger.responses[400] = {
    description: 'Validation or database error occurred.',
    schema: {
      error: 'Error message describing the issue.'
    }
  }

  #swagger.responses[401] = {
    description: 'Unauthorized. Validation failed or a required field is missing.',
    schema: {
      error: 'Error message describing the issue.'
    }
  }
*/
});
router.get("/first-name/:firstName", verifyToken, async (req, res) => {
    await getPeopleByFirstName(req, res);
    /*
  #swagger.summary = 'Get people by first name'
  #swagger.description = 'This endpoint retrieves all people with the specified first name.'

  #swagger.parameters['firstName'] = {
    in: 'path',
    description: 'The first name to search for.',
    required: true,
    type: 'string'
  }

  #swagger.responses[200] = {
    description: 'List of people with the specified first name.',
    schema: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe123',
        phoneNumber: '+1234567890',
        locationId: 1,
        title: 'Software Engineer'
      }
    ]
  }

  #swagger.responses[404] = {
    description: 'No people found with the specified first name.',
    schema: {
      error: 'No such person with first name: John'
    }
  }
*/

});
router.get("/last-name/:lastName", verifyToken, async (req, res) => {
    await getPeopleByLastName(req, res);
    /*
  #swagger.summary = 'Get people by last name'
  #swagger.description = 'This endpoint retrieves all people with the specified last name.'

  #swagger.parameters['lastName'] = {
    in: 'path',
    description: 'The last name to search for.',
    required: true,
    type: 'string'
  }

  #swagger.responses[200] = {
    description: 'List of people with the specified last name.',
    schema: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe123',
        phoneNumber: '+1234567890',
        locationId: 1,
        title: 'Software Engineer'
      }
    ]
  }

  #swagger.responses[404] = {
    description: 'No people found with the specified last name.',
    schema: {
      error: 'No such person with last name: Doe'
    }
  }
*/

});
router.get("/email/:email", verifyToken, async (req, res) => {
    await getPeopleByEmail(req, res);
    /*
  #swagger.summary = 'Get a person by email'
  #swagger.description = 'This endpoint retrieves a person with the specified email address.'

  #swagger.parameters['email'] = {
    in: 'path',
    description: 'The email address to search for.',
    required: true,
    type: 'string'
  }

  #swagger.responses[200] = {
    description: 'Person with the specified email address.',
    schema: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe123',
      phoneNumber: '+1234567890',
      locationId: 1,
      title: 'Software Engineer'
    }
  }

  #swagger.responses[404] = {
    description: 'No person found with the specified email address.',
    schema: {
      error: 'No such person with email: johndoe@example.com'
    }
  }
*/

});
router.get("/username/:username", verifyToken, async (req, res) => {
    await getPeopleByUsername(req, res);
    /*
  #swagger.summary = 'Get a person by username'
  #swagger.description = 'This endpoint retrieves a person with the specified username.'

  #swagger.parameters['username'] = {
    in: 'path',
    description: 'The username to search for.',
    required: true,
    type: 'string'
  }

  #swagger.responses[200] = {
    description: 'Person with the specified username.',
    schema: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe123',
      phoneNumber: '+1234567890',
      locationId: 1,
      title: 'Software Engineer'
    }
  }

  #swagger.responses[404] = {
    description: 'No person found with the specified username.',
    schema: {
      error: 'No such person with username: johndoe123'
    }
  }
*/

});
router.get("/phone-number/:phoneNumber", verifyToken, async (req, res) => {
    await getPeopleByPhoneNumber(req, res);
    /*
  #swagger.summary = 'Get a person by phone number'
  #swagger.description = 'This endpoint retrieves a person with the specified phone number.'

  #swagger.parameters['phoneNumber'] = {
    in: 'path',
    description: 'The phone number to search for.',
    required: true,
    type: 'string'
  }

  #swagger.responses[200] = {
    description: 'Person with the specified phone number.',
    schema: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe123',
      phoneNumber: '+1234567890',
      locationId: 1,
      title: 'Software Engineer'
    }
  }

  #swagger.responses[404] = {
    description: 'No person found with the specified phone number.',
    schema: {
      error: 'No such person with phone number: +1234567890'
    }
  }
*/

});
router.get("/me", verifyToken, (req, res) => {
    decodeToken(req.cookies.tk)
        .then(person => _db.getPeopleById(person.id))
        .then(people => {
            if (people.length == 0) return Promise.reject({error: "An unexpected error occurred"});
            else return res.status(200).json(people[0]);
        })
        .catch(() => res.status(400).send());
    /*
  #swagger.summary = 'Get details of the authenticated user'
  #swagger.description = 'This endpoint retrieves the details of the user associated with the provided token.'

  #swagger.responses[200] = {
    description: 'Authenticated user details.',
    schema: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe123',
      phoneNumber: '+1234567890',
      locationId: 1,
      title: 'Software Engineer'
    }
  }

  #swagger.responses[400] = {
    description: 'Error in token decoding or database lookup.',
    schema: {
      error: 'Error message describing the issue.'
    }
  }
*/

});
router.get("/:id", verifyToken, async (req, res) => {
    await getPeopleById(req, res);
    /*
  #swagger.summary = 'Get a person by their unique ID'
  #swagger.description = 'This endpoint retrieves a person with the specified unique ID.'

  #swagger.parameters['id'] = {
    in: 'path',
    description: 'The unique ID of the person to retrieve.',
    required: true,
    type: 'integer'
  }

  #swagger.responses[200] = {
    description: 'Person with the specified unique ID.',
    schema: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe123',
      phoneNumber: '+1234567890',
      locationId: 1,
      title: 'Software Engineer'
    }
  }

  #swagger.responses[404] = {
    description: 'No person found with the specified unique ID.',
    schema: {
      error: 'No such person with id: 1'
    }
  }
*/

});

async function getAllPeople(_req: Request, res: Response) {
    const _rows: Array<Person> = await _db.getAllPeople();

    res.send(_rows);
}

async function getPeopleById(_req: Request, res: Response) {
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Person> = await _db.getPeopleById(_id);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with id: ${_id}`);
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByFirstName(_req: Request, res: Response) {
    const _firstName: string = _req.params.firstName as any as string;

    const _rows: Array<Person> = await _db.getPeopleByFirstName(_firstName);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with first name: ${_firstName}`);
        return;
    }

    res.send(_rows);
}

async function getPeopleByLastName(_req: Request, res: Response) {
    const _lastName: string = _req.params.lastName as any as string;

    const _rows: Array<Person> = await _db.getPeopleByLastName(_lastName);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with last name: ${_lastName}`);
        return;
    }

    res.send(_rows);
}

async function getPeopleByEmail(_req: Request, res: Response) {
    const _email: string = _req.params.email as any as string;

    const _rows: Array<Person> = await _db.getPeopleByEmail(_email);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with email: ${_email}`);
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByUsername(_req: Request, res: Response) {
    const _username: string = _req.params.username as any as string;

    const _rows: Array<Person> = await _db.getPeopleByUsername(_username);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with username: ${_username}`);
        return;
    }

    res.send(_rows[0]);
}

async function getPeopleByPhoneNumber(_req: Request, res: Response) {
    const _phoneNumber: string = _req.params.phoneNumber as any as string;

    console.log("Decoded Phone Number:", _phoneNumber);

    const _rows: Array<Person> = await _db.getPeopleByPhoneNumber(_phoneNumber);

    if (_rows.length == 0) {
        res.status(404).send(`No such person with phone number: ${_phoneNumber}`);
        return;
    }

    res.send(_rows);
}

export default router;
