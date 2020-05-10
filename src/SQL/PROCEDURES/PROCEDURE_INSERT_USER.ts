
const sql = require('mssql')
import { procedureNames, tablesNames, procedureVariables } from "../SQL_REFERENCES";
import { generateRequest } from "../db_setup";
import { IUser } from "./PROCEDURE_GET_USERS";

const _sp_insert_user = `
    CREATE OR ALTER PROCEDURE ${procedureNames.INSERT_USER}
    (
        @${procedureVariables.user_name} varchar(50),
        @${procedureVariables.user_created_at} DATETIME
    )
    AS
    BEGIN TRAN

        BEGIN TRY

            INSERT INTO ${tablesNames.user}
            VALUES (
                @${procedureVariables.user_name},
                @${procedureVariables.user_created_at} 
            );
            COMMIT TRAN

        END TRY

    BEGIN CATCH
        ROLLBACK TRAN
    END CATCH  
`;

async function STORED_PROCEDURE_INSERT_USER(
        user_name : IUser["user_name"], 
        user_created_at : IUser["user_created_at"]
    ) : Promise<void> {
    try {
        const request = await generateRequest();
        await request
            .input(procedureVariables.user_name, sql.VarChar(50), user_name)
            .input(procedureVariables.user_created_at, sql.DATETIME, user_created_at)
            .execute(procedureNames.INSERT_USER);

    } catch (err) {
        throw {
            message : err,
            status : 500
        }

    }
}

export {
    STORED_PROCEDURE_INSERT_USER,
    _sp_insert_user
}
