import { _sp_get_users } from "./PROCEDURES/PROCEDURE_GET_USERS";
import { _sp_insert_user } from "./PROCEDURES/PROCEDURE_INSERT_USER";
import { _sp_delete_user } from "./PROCEDURES/PROCEDURE_DELETE_USER";
import { tablesNames, columnNames } from "./SQL_REFERENCES";
import { _sp_insert_blob_upload_file_name } from "./PROCEDURES/PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME";

const sql = require('mssql');
require('dotenv').config();

const sql_dropTable = `
    DROP TABLE IF EXISTS ${tablesNames.user}
    DROP TABLE IF EXISTS ${tablesNames.file_name}
`;

const sql_createTables = `
    Set DateFormat YMD; 

    CREATE TABLE ${tablesNames.user}(
        ${columnNames.USER_ID} int IDENTITY(1,1) PRIMARY KEY,
        ${columnNames.USER_NAME} varchar(50) NOT NULL,
        ${columnNames.USER_CREATED_AT} DATETIME NOT NULL
    );

    CREATE TABLE ${tablesNames.file_name}(
        ${columnNames.FILE_NAME_ID} int IDENTITY(1,1) PRIMARY KEY,
        ${columnNames.FILE_NAME_NAME} varchar(150) NOT NULL,
        ${columnNames.FIRST_LINE} varchar(50) NOT NULL,
        ${columnNames.FILE_NAME_CREATED_AT} DATETIME NOT NULL
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
        await request.query(_sp_insert_blob_upload_file_name);
    } catch (err) {
        throw err;
    }
}

export { 
    setupTable, 
    generateRequest 
};
