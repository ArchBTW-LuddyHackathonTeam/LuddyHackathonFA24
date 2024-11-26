import express from "express";
import DBInterface from "../db-interface";
import {Repository} from '../db-types';
import {Request, Response} from "express-serve-static-core";
import {verifyToken} from "../utils/auth";

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", verifyToken, async (req, res) => {
    await getAllRepositories(req, res);
    /*
    #swagger.summary = 'Retrieve all repositories from the database'
    #swagger.description = 'This endpoint fetches a list of all repositories in the database.'

    #swagger.responses[200] = {
      description: 'List of all repositories.',
      schema: [
        {
          id: 1,
          name: 'Repo 1',
          description: 'Repository 1 description',
          contactPersonId: 2
        },
        {
          id: 2,
          name: 'Repo 2',
          description: 'Repository 2 description',
          contactPersonId: 3
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
router.get("/name/:name", verifyToken, async (req, res) => {
    await getRepositoryByName(req, res);
    /*
    #swagger.summary = 'Retrieve repository by name'
    #swagger.description = 'This endpoint fetches repositories matching the given name.'

    #swagger.parameters['name'] = {
      in: 'path',
      description: 'Name of the repository to search for',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of repositories matching the name.',
      schema: [
        {
          id: 1,
          name: 'Repo 1',
          description: 'Repository 1 description',
          contactPersonId: 2
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No repository found with the specified name.',
      schema: {
        error: 'No such repository with name: {name}'
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error.',
      schema: {
        error: 'Error message describing the issue.'
      }
    }
    */
});
router.get("/cp-id/:contactPersonId", verifyToken, async (req, res) => {
    getRepositoryByContactPersonId(req, res);
    /*
    #swagger.summary = 'Retrieve repositories by contact person ID'
    #swagger.description = 'This endpoint fetches repositories associated with the given contact person ID.'

    #swagger.parameters['contactPersonId'] = {
      in: 'path',
      description: 'Contact person ID to filter repositories by.',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: 'List of repositories associated with the contact person ID.',
      schema: [
        {
          id: 1,
          name: 'Repo 1',
          description: 'Repository 1 description',
          contactPersonId: 2
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No repositories found with the specified contact person ID.',
      schema: {
        error: 'No such repository with contact person ID: {contactPersonId}'
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error.',
      schema: {
        error: 'Error message describing the issue.'
      }
    }
    */
});
router.get("/:id", verifyToken, async (req, res) => {
    getRepositoryById(req, res);
    /*
    #swagger.summary = 'Retrieve repository by ID'
    #swagger.description = 'This endpoint fetches a repository based on its ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the repository to retrieve.',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: 'Repository found by ID.',
      schema: {
        id: 1,
        name: 'Repo 1',
        description: 'Repository 1 description',
        contactPersonId: 2
      }
    }

    #swagger.responses[404] = {
      description: 'No repository found with the specified ID.',
      schema: {
        error: 'No such repository with id: {id}'
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error.',
      schema: {
        error: 'Error message describing the issue.'
      }
    }
    */
});

async function getAllRepositories(_req: Request, res: Response) {
    const _rows: Array<Repository> = await _db.getAllRepositories();

    res.send(_rows);
}

async function getRepositoryById(_req: Request, res: Response) {
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Repository> = await _db.getRepositoryById(_id);

    if (_rows.length == 0) {
        res.status(404).send(`No such repository with id: ${_id}`);
        return;
    }

    res.send(_rows[0]);
}

async function getRepositoryByName(_req: Request, res: Response) {
    const _name: string = _req.params.name as any as string;

    const _rows: Array<Repository> = await _db.getRepositoryByName(_name);

    if (_rows.length == 0) {
        res.status(404).send(`No such repository with name: ${_name}`);
        return;
    }

    res.send(_rows);
}

async function getRepositoryByContactPersonId(_req: Request, res: Response) {
    const _contactPersonId: number = _req.params.contactPersonId as any as number;

    const _rows: Array<Repository> = await _db.getRepositoryByContactPersonId(_contactPersonId);

    if (_rows.length == 0) {
        res.status(404).send(`No such repository with contact person id: ${_contactPersonId}`);
        return;
    }

    res.send(_rows);
}

export default router;
