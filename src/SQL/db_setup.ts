import { _sp_get_users } from "./PROCEDURES/PROCEDURE_GET_USERS";
import { _sp_insert_user } from "./PROCEDURES/PROCEDURE_INSERT_USER";
import { _sp_delete_user } from "./PROCEDURES/PROCEDURE_DELETE_USER";
import { tablesNames } from "./SQL_REFERENCES";

const sql = require('mssql');
require('dotenv').config();

const sql_dropTable = `
    DROP TABLE IF EXISTS ${tablesNames.user}
`;

const sql_createTables = `
    Set DateFormat YMD; 

    CREATE TABLE ${tablesNames.user}(
        user_id int IDENTITY(1,1) PRIMARY KEY,
        user_name varchar(50) NOT NULL,
        user_created_at DATETIME NOT NULL
    );
`;

const options = {
    "user":  process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "server":  process.env.DB_SERVER,
    "database": process.env.DB_DATABASE,
    "port" : Number(process.env.DB_PORT),
    "pool": {
        "max": 10,
        "min": 0,
        "idleTimeoutMillis": 30000
    },
    "options": {
        "enableArithAbort": true,
        "trustedConnection" : true
    }
};

const mssqlConnect : Promise<any> = (async () => {

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(options);
        return sql;
    } catch (err) {
        throw err;
    }
})();

async function generateRequest() {
    try {
        const sql = await mssqlConnect;
        return new sql.Request()
    } catch (err) {
        throw err;
    }
}

async function setupTable() {
    try {
        const request = await generateRequest();
        await request.query(sql_dropTable);
        await request.query(sql_createTables);
        await request.query(_sp_get_users);
        await request.query(_sp_insert_user);
        await request.query(_sp_delete_user);
    } catch (err) {
        throw err;
    }
}

export { 
    setupTable, 
    generateRequest 
};
