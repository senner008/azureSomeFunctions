
const sql = require('mssql')
import { procedureNames, tablesNames } from "../SQL_REFERENCES";
import { generateRequest } from "../db_setup";

const _sp_get_users = `
    CREATE OR ALTER PROCEDURE ${procedureNames.GET_USERS}
    AS
    BEGIN TRAN

        BEGIN TRY

            SELECT * FROM ${tablesNames.user}
            COMMIT TRAN

        END TRY

    BEGIN CATCH
        ROLLBACK TRAN
    END CATCH  
`;

const usersNotFoundError = {
    message: "Users not found!",
    statusCode: 404
}

async function STORED_PROCEDURE_GET_USERS() : Promise<IUser[]> {
    try {
        const request = await generateRequest();
        const result = await request
            .execute(procedureNames.GET_USERS);

        if (result.recordset === undefined || result.recordset.length == 0) {
            throw usersNotFoundError;
        }
        return result.recordset;
    } catch (err) {
        if (err.message  === usersNotFoundError.message) {
            throw err;
        }
        throw {
            message : "Database error!",
            statusCode : 500
        }
    }
}

interface IUser {
    user_id : number;
    user_name : string;
    user_created_at : Date;
}

export {
    STORED_PROCEDURE_GET_USERS,
    _sp_get_users,
    IUser
}
