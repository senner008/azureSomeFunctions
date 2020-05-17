
const sql = require('mssql')
import { procedureNames, tablesNames, procedureVariables, columnNames } from "../SQL_REFERENCES";
import { generateRequest } from "../db_setup";

const _sp_delete_user = `
    CREATE OR ALTER PROCEDURE ${procedureNames.DELETE_USER}
    (
        @${procedureVariables.user_id} int
    )
    AS
    BEGIN TRAN

        BEGIN TRY

            DELETE FROM ${tablesNames.user}
                WHERE ${columnNames.USER_ID} = @${procedureVariables.user_id}
            COMMIT TRAN

        END TRY

    BEGIN CATCH
        ROLLBACK TRAN
    END CATCH  
`;

async function STORED_PROCEDURE_DELETE_USER(user_id : number) : Promise<void> {
    try {
        const request = await generateRequest();
        await request
            .input(procedureVariables.user_id, sql.INT, user_id)
            .execute(procedureNames.DELETE_USER);

    } catch (err) {
        throw {
            message : "Database error!",
            statusCode : 500
        }
    }
}


export {
    STORED_PROCEDURE_DELETE_USER,
    _sp_delete_user,
}
