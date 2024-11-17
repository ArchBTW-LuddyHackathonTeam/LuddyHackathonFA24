import pg, {QueryResult} from 'pg';
import {Person, Location, Product, Repository} from "./db-types";
import dotenv from "dotenv"

dotenv.config()

export default class DBInterface {
    private client: pg.Client;

    constructor(){
        this.client = new pg.Client();

        this.client.connect(function (err : Error | null) {
            if(err) {
                throw err; //TODO: error handling when pg connection fails
            }
            else{
                console.log("Database Connected");
            }
        });
    }

    //People functions

    public async getAllPeople(): Promise<Array<Person>> {
        const res: QueryResult = await this.client.query("SELECT person_id, person_first_name, person_last_name," +
            " person_email, person_username, person_phone_number, location_id, person_title FROM person;")

        return this.toPerson(res.rows);
    }

    public async getPeopleById(_id: number): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_id = $1;";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getPeopleByFirstName(_firstName: string): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_first_name = $1;";
        const _values: Array<string> = [_firstName];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getPeopleByLastName(_lastName: string): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_last_name = $1;";
        const _values: Array<string> = [_lastName];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getPeopleByEmail(_email: string): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_email = $1;";
        const _values: Array<string> = [_email];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getPeopleByUsername(_username: string): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_username = $1;";
        const _values: Array<string> = [_username];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getPeopleByPhoneNumber(_phoneNumber: string): Promise<Array<Person>> {
        const _query: string = "SELECT person_id, person_first_name, person_last_name, person_email, person_username," +
            "person_phone_number, location_id, person_title FROM person WHERE person_phone_number = $1;";
        const _values: Array<string> = [_phoneNumber];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    // Location Functions

    public async getAllLocations(): Promise<Array<Location>> {
        const res: QueryResult = await this.client.query("SELECT * FROM location");

        return this.toLocation(res.rows);
    }

    public async getLocationByCity(_city: string): Promise<Array<Location>> {
        const _query: string = "SELECT * FROM location WHERE location_city = $1";
        const _values: Array<string> = [_city];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toLocation(res.rows);
    }

    public async getLocationById(_id: number): Promise<Array<Location>> {
        const _query: string = "SELECT * FROM location WHERE location_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toLocation(res.rows);
    }

    public async getLocationByRegion(_region: string): Promise<Array<Location>> {
        const _query: string = "SELECT * FROM location WHERE location_region = $1";
        const _values: Array<string> = [_region];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toLocation(res.rows);
    }

    public async getLocationByCountry(_country: string): Promise<Array<Location>> {
        const _query: string = "SELECT * FROM location WHERE location_country = $1";
        const _values: Array<string> = [_country];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toLocation(res.rows);
    }

    //Product Functions

    public async getAllProducts(): Promise<Array<Product>> {
        const res: QueryResult = await this.client.query("SELECT * FROM product");

        return res.rows as Array<Product>;
    }

    public async getProductById(_id: number): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE product_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Product>;
    }

    public async getProductByName(_name: string): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE product_name = $1";
        const _values: Array<string> = [_name];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Product>;
    }

    public async getProductByContactPersonId(_id: number): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE contact_person_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Product>;
    }

    //Repository Functions

    public async getAllRepositories(): Promise<Array<Repository>> {
        const res: QueryResult = await this.client.query("SELECT * FROM repository");

        return res.rows as Array<Repository>;
    }

    public async getRepositoryById(_id: number): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository where repository_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Repository>;
    }

    public async getRepositoryByName(_name: string): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository WHERE repository_name = $1";
        const _values: Array<string> = [_name];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Repository>;
    }

    public async getRepositoryByContactPersonId(_id: number): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository WHERE contact_person_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows as Array<Repository>;
    }

    //User Functions

    public async getUserByUsernameAndPasswordHash(_username: string, _passwordHash: string){
        const _query: string = "SELECT * FROM person WHERE person_username = $1 AND person_password_hash = $2";
        const _values: Array<string> = [_username, _passwordHash];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getUserByEmailAndPasswordHash(_email: string, _passwordHash: string){
        const _query: string = "SELECT * FROM person WHERE person_email = $1 AND person_password_hash = $2";
        const _values: Array<String> = [_email, _passwordHash];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public toPerson(_rows: Array<any>): Array<Person> {
        let people: Array<Person> = [];

        for(let row of _rows){
            let person: Person = {
                id: row.person_id,
                firstName: row.person_first_name,
                lastName: row.person_last_name,
                email: row.person_email,
                username: row.person_username,
                phoneNumber: row.person_phone_number,
                locationId: row.person_location_id,
                title: row.person_title
            }

            people.push(person);
        }

        return people;
    }

    public toLocation(_rows: Array<any>): Array<Location> {
        let locations: Array<Location> = [];

        for(let row of _rows){
           let location: Location = {
               id: row.location_id,
               streetAddress: row.location_street_address,
               secondaryAddress: row.location_secondary_address,
               city: row.location_city,
               region: row.location_region,
               zipCode: row.location_zip_code,
               country: row.location_country
           };

           locations.push(location);
        }

        return locations;
    }
}
