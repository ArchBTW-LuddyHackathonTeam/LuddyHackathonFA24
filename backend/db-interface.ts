import pg from 'pg';
import config from './resources/pg-config.json'

class DBInterface {
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
}

module.exports = DBInterface;