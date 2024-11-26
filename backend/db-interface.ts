import pg from 'pg';
import dotenv from 'dotenv';
import {QueryResult} from 'pg';
import {Person, Product, Repository, Location} from './db-types';

dotenv.config();

export default class DBInterface {
    private client: pg.Client;

    constructor() {
        this.client = new pg.Client({
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 5432,
            user: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'postgres',
            database: process.env.DATABASE_NAME || 'mydatabase'
        });

        this.client.connect((err: Error | null) => {
            if (err) {
                console.error('Database connection error:', err.stack);
            } else {
                console.log('Database Connected');
            }
        });
    }

    //People functions

    public async getAllPeople(): Promise<Array<Person>> {
        const res: QueryResult = await this.client.query("SELECT person_id, person_first_name, person_last_name," +
            " person_email, person_username, person_phone_number, location_id, person_title FROM person;");

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

    public async addPerson(person: Person): Promise<Person> {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO person (person_first_name, person_last_name, person_email, person_username, person_phone_number, location_id, person_title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
            const values = [person.firstName, person.lastName, person.email, person.username, person.phoneNumber, person.locationId, person.title];

            const res: QueryResult = await this.client.query(query, values);
            const rows = res.rows;

            if (rows.length === 0) {
                reject({message: "Duplicate Field"});
            }

            resolve(this.toPerson(rows)[0]);
        });
    }

    public async addPersonPasswordHashById(personId: number, passwordHash: string, salt: string): Promise<Person> {
        const query = "UPDATE person SET person_password_hash = $2, person_salt = $3 WHERE person_id = $1 RETURNING *;";
        const values = [personId, passwordHash, salt];

        const res: QueryResult = await this.client.query(query, values);

        return this.toPerson(res.rows)[0];
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

    public async addLocation(location: Location): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO location (location_street_address, location_secondary_address, location_city, location_region, location_zip_code, location_country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
            const values = [location.streetAddress, location.secondaryAddress, location.city, location.region, location.zipCode, location.country];

            const res: QueryResult = await this.client.query(query, values);
            const rows = res.rows;

            if (rows.length === 0) {
                reject({message: "Duplicate Field"});
            }

            resolve(this.toLocation(rows)[0]);
        });
    }

    //Product Functions

    public async getAllProducts(): Promise<Array<Product>> {
        const res: QueryResult = await this.client.query("SELECT * FROM product");

        return this.toProduct(res.rows);
    }

    public async getProductById(_id: number): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE product_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toProduct(res.rows);
    }

    public async getProductByName(_name: string): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE product_name = $1";
        const _values: Array<string> = [_name];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toProduct(res.rows);
    }

    public async getProductByContactPersonId(_id: number): Promise<Array<Product>> {
        const _query: string = "SELECT * FROM product WHERE contact_person_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toProduct(res.rows);
    }

    public async addProduct(product: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO product (product_name, product_description, contact_person_id) VALUES ($1, $2, $3) RETURNING *;";
            const values = [product.name, product.description, product.contactPersonId];

            const res: QueryResult = await this.client.query(query, values);
            const rows = res.rows;

            if (rows.length === 0) {
                reject({message: "Duplicate Field"});
            }

            resolve(this.toProduct(rows)[0]);
        });
    }

    //Repository Functions

    public async getAllRepositories(): Promise<Array<Repository>> {
        const res: QueryResult = await this.client.query("SELECT * FROM repository");

        return this.toRepository(res.rows);
    }

    public async getRepositoryById(_id: number): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository where repository_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toRepository(res.rows);
    }

    public async getRepositoryByName(_name: string): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository WHERE repository_name = $1";
        const _values: Array<string> = [_name];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toRepository(res.rows);
    }

    public async getRepositoryByContactPersonId(_id: number): Promise<Array<Repository>> {
        const _query: string = "SELECT * FROM repository WHERE contact_person_id = $1";
        const _values: Array<number> = [_id];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toRepository(res.rows);
    }

    public async addRepository(repository: Repository): Promise<Repository> {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO repository (repository_name, repository_description, contact_person_id) VALUES ($1, $2, $3) RETURNING *;";
            const values = [repository.name, repository.description, repository.contactPersonId];

            const res: QueryResult = await this.client.query(query, values);
            const rows = res.rows;

            if (rows.length === 0) {
                reject({message: "Duplicate Field"});
            }

            resolve(this.toRepository(rows)[0]);
        });
    }

    //User Functions

    public async getUserByUsernameAndPasswordHash(_username: string, _passwordHash: string) {
        const _query: string = "SELECT * FROM person WHERE person_username = $1 AND person_password_hash = $2";
        const _values: Array<string> = [_username, _passwordHash];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getUserByEmailAndPasswordHash(_email: string, _passwordHash: string) {
        const _query: string = "SELECT * FROM person WHERE person_email = $1 AND person_password_hash = $2";
        const _values: Array<String> = [_email, _passwordHash];

        const res: QueryResult = await this.client.query(_query, _values);

        return this.toPerson(res.rows);
    }

    public async getUserSaltById(personId: number): Promise<string> {
        const _query: string = "SELECT person_salt FROM person WHERE person_id = $1";
        const _values = [personId];

        const res: QueryResult = await this.client.query(_query, _values);

        return res.rows[0].person_salt;
    }

    public toPerson(_rows: Array<any>): Array<Person> {
        let people: Array<Person> = [];

        for (let row of _rows) {
            let person: Person = {
                id: row.person_id,
                firstName: row.person_first_name,
                lastName: row.person_last_name,
                email: row.person_email,
                username: row.person_username,
                phoneNumber: row.person_phone_number,
                locationId: row.location_id,
                title: row.person_title
            };

            people.push(person);
        }

        return people;
    }

    public toLocation(_rows: Array<any>): Array<Location> {
        let locations: Array<Location> = [];

        for (let row of _rows) {
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

    public toProduct(_rows: Array<any>): Array<Product> {
        let products: Array<Product> = [];

        for (let row of _rows) {
            let product: Product = {
                id: row.product_number,
                name: row.product_name,
                description: row.product_description,
                contactPersonId: row.contact_person_id
            };

            products.push(product);
        }

        return products;
    }

    public toRepository(_rows: Array<any>): Array<Repository> {
        let repositories: Array<Repository> = [];

        for (let row of _rows) {
            let repository: Repository = {
                id: row.repository_id,
                name: row.repository_name,
                description: row.repository_description,
                contactPersonId: row.contact_person_id
            };

            repositories.push(repository);
        }

        return repositories;
    }
}
