import { tablesNames } from "../SQL_REFERENCES";

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


export {
    sql_dropTable,
    sql_createTables
}
