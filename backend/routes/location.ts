import express from "express";
import DBInterface from "../db-interface";
import {Location} from '../db-types';
import {Request, Response} from "express-serve-static-core";
import {verifyToken} from "../utils/auth";

const router = express();

//Initialize db interface
const _db = new DBInterface();

router.get("/", verifyToken, async (req, res) => {
    await getAllLocations(req, res);
    /*
#swagger.summary = 'Retrieve all locations from the database'
#swagger.description = 'This endpoint fetches a list of all locations in the database.'

#swagger.responses[200] = {
  description: 'List of all locations.',
  schema: [
    {
      id: 1,
      streetAddress: '123 Main St',
      secondaryAddress: 'Apt 4B',
      city: 'Springfield',
      region: 'Illinois',
      zipCode: '62701',
      country: 'USA'
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
router.get("/stringify", verifyToken, async (req, res) => {
    await stringifyAllLocations(req, res);
    /*
    #swagger.summary = 'Retrieve all locations as stringified addresses'
    #swagger.description = 'This endpoint fetches a list of all locations and returns them as formatted addresses.'

    #swagger.responses[200] = {
      description: 'List of stringified addresses.',
      schema: [
        {
          address: '123 Main St, Apt 4B, Springfield, Illinois, 62701, USA'
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
router.get("/stringify/city/:city", verifyToken, async (req, res) => {
    await stringifyLocation(req, res, getLocationByCity);
    /*
    #swagger.summary = 'Retrieve stringified locations filtered by city'
    #swagger.description = 'This endpoint fetches all locations in a given city and returns them as formatted addresses.'

    #swagger.parameters['city'] = {
      in: 'path',
      description: 'City name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of stringified addresses for the specified city.',
      schema: [
        {
          address: '123 Main St, Springfield, Illinois, 62701, USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given city.',
      schema: {
        error: 'No such location with city: Springfield'
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
router.get("/stringify/region/:region", verifyToken, async (req, res) => {
    await stringifyLocation(req, res, getLocationByRegion);
    /*
    #swagger.summary = 'Retrieve stringified locations filtered by region'
    #swagger.description = 'This endpoint fetches all locations in a given region and returns them as formatted addresses.'

    #swagger.parameters['region'] = {
      in: 'path',
      description: 'Region name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of stringified addresses for the specified region.',
      schema: [
        {
          address: '123 Main St, Springfield, Illinois, 62701, USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given region.',
      schema: {
        error: 'No such location with region: Illinois'
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
router.get("/stringify/country/:country", verifyToken, async (req, res) => {
    await stringifyLocation(req, res, getLocationByCountry);
    /*
    #swagger.summary = 'Retrieve stringified locations filtered by country'
    #swagger.description = 'This endpoint fetches all locations in a given country and returns them as formatted addresses.'

    #swagger.parameters['country'] = {
      in: 'path',
      description: 'Country name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of stringified addresses for the specified country.',
      schema: [
        {
          address: '123 Main St, Springfield, Illinois, 62701, USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given country.',
      schema: {
        error: 'No such location with country: USA'
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
router.get("/stringify/:id", verifyToken, async (req, res) => {
    await stringifyLocation(req, res, getLocationById);
    /*
        #swagger.summary = 'Retrieve a stringified location filtered by ID'
        #swagger.description = 'This endpoint fetches a location by ID and returns it as a formatted address.'

        #swagger.parameters['id'] = {
          in: 'path',
          description: 'Location ID to retrieve the location',
          required: true,
          type: 'integer'
        }

        #swagger.responses[200] = {
          description: 'Stringified address for the specified location.',
          schema: {
            address: '123 Main St, Apt 4B, Springfield, Illinois, 62701, USA'
          }
        }

        #swagger.responses[404] = {
          description: 'No location found for the given ID.',
          schema: {
            error: 'No such location with id: 1'
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
router.get("/city/:city", verifyToken, async (req, res) => {
    await getLocationByCity(req, res);
    /*
    #swagger.summary = 'Retrieve locations filtered by city'
    #swagger.description = 'This endpoint fetches all locations in a given city.'

    #swagger.parameters['city'] = {
      in: 'path',
      description: 'City name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of locations in the specified city.',
      schema: [
        {
          id: 1,
          streetAddress: '123 Main St',
          secondaryAddress: 'Apt 4B',
          city: 'Springfield',
          region: 'Illinois',
          zipCode: '62701',
          country: 'USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given city.',
      schema: {
        error: 'No such location with city: Springfield'
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
router.get("/region/:region", verifyToken, async (req, res) => {
    await getLocationByRegion(req, res);
    /*
    #swagger.summary = 'Retrieve locations filtered by region'
    #swagger.description = 'This endpoint fetches all locations in a given region.'

    #swagger.parameters['region'] = {
      in: 'path',
      description: 'Region name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of locations in the specified region.',
      schema: [
        {
          id: 1,
          streetAddress: '123 Main St',
          secondaryAddress: 'Apt 4B',
          city: 'Springfield',
          region: 'Illinois',
          zipCode: '62701',
          country: 'USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given region.',
      schema: {
        error: 'No such location with region: Illinois'
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
router.get("/country/:country", verifyToken, async (req, res) => {
    await getLocationByCountry(req, res);
    /*
    #swagger.summary = 'Retrieve locations filtered by country'
    #swagger.description = 'This endpoint fetches all locations in a given country.'

    #swagger.parameters['country'] = {
      in: 'path',
      description: 'Country name to filter locations',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'List of locations in the specified country.',
      schema: [
        {
          id: 1,
          streetAddress: '123 Main St',
          secondaryAddress: 'Apt 4B',
          city: 'Springfield',
          region: 'Illinois',
          zipCode: '62701',
          country: 'USA'
        }
      ]
    }

    #swagger.responses[404] = {
      description: 'No locations found for the given country.',
      schema: {
        error: 'No such location with country: USA'
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
    await getLocationById(req, res);
    /*
    #swagger.summary = 'Retrieve location filtered by ID'
    #swagger.description = 'This endpoint fetches a location by its ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Location ID to retrieve the location',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: 'Location with the specified ID.',
      schema: {
        id: 1,
        streetAddress: '123 Main St',
        secondaryAddress: 'Apt 4B',
        city: 'Springfield',
        region: 'Illinois',
        zipCode: '62701',
        country: 'USA'
      }
    }

    #swagger.responses[404] = {
      description: 'No location found for the given ID.',
      schema: {
        error: 'No such location with id: 1'
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


function formatLocation(location: Location): string {
    const {streetAddress, secondaryAddress, city, region, zipCode, country} = location;
    const firstLine = [streetAddress, secondaryAddress].filter(Boolean).join(" ");
    const secondLine = [
        city,
        region,
        zipCode
    ]
        .filter(Boolean)
        .join(", ");
    const thirdLine = country || "";

    return [firstLine, secondLine, thirdLine].filter(Boolean).join("\n");
}

function stringifyResponse(data: Array<Location> | Location): Array<{ address: string }> | { address: string } {
    if (Array.isArray(data)) {
        if (data.length === 1) {
            return {address: formatLocation(data[0])};
        }
        return data.map(location => ({address: formatLocation(location)}));
    }
    return {address: formatLocation(data)};
}

async function stringifyAllLocations(_req: Request, res: Response) {
    const _rows: Array<Location> = await _db.getAllLocations();

    res.json(stringifyResponse(_rows));
}

async function stringifyLocation(req: Request, res: Response, handler: Function) {
    const originalJson = res.json.bind(res);
    res.json = (data: any) => originalJson(stringifyResponse(data));
    await handler(req, res);
}

async function getAllLocations(_req: Request, res: Response) {
    const _rows: Array<Location> = await _db.getAllLocations();

    res.send(_rows);
}

async function getLocationById(_req: Request, res: Response) {
    const _id: number = _req.params.id as any as number;

    const _rows: Array<Location> = await _db.getLocationById(_id);

    if (_rows.length == 0) {
        res.status(404).send(`No such location with id: ${_id}`);
        return;
    }

    res.send(_rows[0]);
}

async function getLocationByCity(_req: Request, res: Response) {
    const _city: string = _req.params.city as any as string;

    const _rows: Array<Location> = await _db.getLocationByCity(_city);

    if (_rows.length == 0) {
        res.status(404).send(`No such location with city: ${_city}`);
        return;
    }

    res.send(_rows);
}

async function getLocationByRegion(_req: Request, res: Response) {
    const _region: string = _req.params.region as any as string;

    const _rows: Array<Location> = await _db.getLocationByRegion(_region);

    if (_rows.length == 0) {
        res.status(404).send(`No such location with region: ${_region}`);
        return;
    }

    res.send(_rows);
}

async function getLocationByCountry(_req: Request, res: Response) {
    const _country: string = _req.params.country as any as string;

    const _rows: Array<Location> = await _db.getLocationByCountry(_country);

    if (_rows.length == 0) {
        res.status(404).send(`No such location with country: ${_country}`);
        return;
    }

    res.send(_rows);
}


export default router;
