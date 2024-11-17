import express from "express";
import DBInterface from "../db-interface";
import {Product} from '../db-types'
import { Request, Response } from "express-serve-static-core";
import { verifyToken } from "../utils/auth"

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", verifyToken, async (req, res) => {
    await getAllProducts(req, res)
    /*
    #swagger.summary = 'Retrieve all products from the database'
    #swagger.description = 'This endpoint fetches a list of all products stored in the database.'

    #swagger.responses[200] = {
      description: 'List of all products.',
      schema: [
        {
          id: 1,
          name: 'Product Name',
          description: 'Product Description',
          price: 99.99,
          contactPersonId: 1
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
    await getProductByName(req, res)
    /*
    #swagger.summary = 'Retrieve a product by its name'
    #swagger.description = 'This endpoint fetches a list of products that match the specified name in the database.'

    #swagger.parameters['name'] = {
      in: 'path',
      description: 'The name of the product to search for.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of products with the specified name.',
      schema: [
        {
          id: 1,
          name: 'Product Name',
          description: 'Product Description',
          price: 99.99,
          contactPersonId: 1
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'Product not found with the specified name.',
      schema: {
        error: 'No such product name: {name}'
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
    await getProductByContactPersonId(req, res)
    /*
    #swagger.summary = 'Retrieve products by contact person ID'
    #swagger.description = 'This endpoint fetches a list of products associated with a specific contact person ID.'

    #swagger.parameters['contactPersonId'] = {
      in: 'path',
      description: 'The contact person ID to filter products.',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: 'List of products associated with the specified contact person ID.',
      schema: [
        {
          id: 1,
          name: 'Product Name',
          description: 'Product Description',
          price: 99.99,
          contactPersonId: 1
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No products found for the specified contact person ID.',
      schema: {
        error: 'No such product contact person id: {contactPersonId}'
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
    await getProductById(req, res)
    /*
    #swagger.summary = 'Retrieve a product by its ID'
    #swagger.description = 'This endpoint fetches a product by its unique ID from the database.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'The ID of the product to fetch.',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: 'Product details by ID.',
      schema: {
        id: 1,
        name: 'Product Name',
        description: 'Product Description',
        price: 99.99,
        contactPersonId: 1
      }
    }

    #swagger.responses[404] = {
      description: 'Product not found with the specified ID.',
      schema: {
        error: 'No such product with id: {id}'
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
