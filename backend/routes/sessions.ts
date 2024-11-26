import express from "express";
import {createToken, hashPassword} from "../utils/auth";
import {Person} from "../db-types";
import login from "../utils/loginSchema";
import DBInterface from "../db-interface";

const router = express();

const _db = new DBInterface();


router.post("/", (req, res) => {
    login.validateAsync(req.body)
        .then(body => Promise.all([body.email, body.password, _db.getPeopleByEmail(body.email)]))
        .then(body => {
            if (body[2].length == 0) return Promise.reject({message: "Invalid E-Mail or Password"});
            else return Promise.all([body[0], body[1], body[2][0]]);
        })
        .then(body => Promise.all([body[0], body[1], _db.getUserSaltById(body[2].id)]))
        .then(body => Promise.all([body[0], hashPassword(body[1], body[2])]))
        .then(body => _db.getUserByEmailAndPasswordHash(body[0], body[1]))
        .then(dbResults => {
            if (dbResults.length == 0) return Promise.reject({message: "Invalid E-Mail or Password"});
            else return dbResults[0];
        })
        .then(body => createToken({id: body.id, firstName: body.firstName, lastName: body.lastName} as Person))
        .then(token => res.status(200).cookie("tk", token, {maxAge: 604800000, httpOnly: true}).json({success: true}))
        .catch(message => {
            res.status(401).json({error: message.message});
        });
    /*
  #swagger.summary = 'Authenticate user and return token'
  #swagger.description = 'This endpoint handles user authentication by validating the provided email and password. If successful, a JWT token is returned and stored in a secure cookie for further requests.'
  #swagger.parameters[0] = {
    in: 'body',
    description: 'User login credentials',
    required: true,
    schema: {
      email: 'johndoe@example.com',
      password: 'password123'
    }
  }
  #swagger.responses[200] = {
    description: 'Authentication successful, token set in cookie.',
    schema: {
      success: true
    }
  }
  #swagger.responses[401] = {
    description: 'Invalid email or password.',
    schema: {
      error: 'Invalid E-Mail or Password'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error.',
    schema: {
      error: 'Error message describing the issue'
    }
  }
  */
});

router.delete("/", (req, res) => {
    if (req.cookies.tk) res.clearCookie("tk").status(200).json({success: true});
    else res.status(400).json({success: false});
    /*
    #swagger.summary = 'Logout user by clearing the token'
    #swagger.description = 'This endpoint logs out the user by clearing the authentication token cookie from the browser.'
    #swagger.responses[200] = {
      description: 'Logout successful, token cleared.',
      schema: {
        success: true
      }
    }
    #swagger.responses[400] = {
      description: 'No authentication token found.',
      schema: {
        success: false
      }
    }
    #swagger.responses[500] = {
      description: 'Internal server error.',
      schema: {
        error: 'Error message describing the issue'
      }
    }
    */
});

export default router;
