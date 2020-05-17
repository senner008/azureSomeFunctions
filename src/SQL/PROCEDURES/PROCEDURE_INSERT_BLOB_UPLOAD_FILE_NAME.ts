
const sql = require('mssql')
import { procedureNames, tablesNames, procedureVariables } from "../SQL_REFERENCES";
import { generateRequest } from "../db_setup";

const _sp_insert_blob_upload_file_name = `
    CREATE OR ALTER PROCEDURE ${procedureNames.INSERT_BLOB_UPLOAD_FILE_NAME}
    (
        @${procedureVariables.file_name_name} varchar(150),
        @${procedureVariables.file_first_line} varchar(50),
        @${procedureVariables.file_name_created_at} DATETIME
    )
    AS
    BEGIN TRAN

        BEGIN TRY

            INSERT INTO ${tablesNames.file_name}
            VALUES (
                @${procedureVariables.file_name_name},
                @${procedureVariables.file_first_line},
                @${procedureVariables.file_name_created_at} 
            );
            COMMIT TRAN

        END TRY

    BEGIN CATCH
        ROLLBACK TRAN
    END CATCH  
`;

async function PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME(
        file_name : string,
        first_line : string,
        date : Date
    ) : Promise<void> {
    try {
        const request = await generateRequest();
        await request
            .input(procedureVariables.file_name_name, sql.VarChar(150), file_name)
            .input(procedureVariables.file_first_line, sql.VarChar(50), first_line)
            .input(procedureVariables.file_name_created_at, sql.DATETIME, date)
            .execute(procedureNames.INSERT_BLOB_UPLOAD_FILE_NAME);

    } catch (err) {
        throw {
            message : err,
            status : 500
        }
    }
}

export {
    PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME,
    _sp_insert_blob_upload_file_name
}
