import pg, {QueryResult} from 'pg';
import config from './resources/pg-config.json'
import Person from './db-interface'
import Location from './db-interface'
import Product from './db-interface'
import Repository from './db-interface'

export default class DBInterface {
    private client: pg.Client;

    constructor(){
        if(!config){
            throw new Error("pg-config.json not found, aborting");
        }

        this.client = new pg.Client(config);

        this.client.connect(function (err : Error | null) {
            if(err) {
                throw err; //TODO: error handling when pg connection fails
            }
            else{
                console.log("Database Connected");
            }
        });
    }

    public async getAllPeople(): Promise<Array<Person>> {
        const res: QueryResult = await this.client.query("SELECT person_id, person_first_name, person_last_name, person_email, " +
            "person_username, location_id, person_title FROM person;")

        return (res.rows as Array<Person>);
    }

    public async getAllLocations(): Promise<Array<Location>> {
        const res: QueryResult = await this.client.query("SELECT * FROM location");

        return (res.rows as Array<Location>);
    }

    public async getAllProducts(): Promise<Array<Product>> {
        const res: QueryResult = await this.client.query("SELECT * FROM product");

        return (res.rows as Array<Product>);
    }

    public async getAllRepositories(): Promise<Array<Repository>> {
        const res: QueryResult = await this.client.query("SELECT * FROM repository");

        return (res.rows as Array<Repository>);
    }
}
