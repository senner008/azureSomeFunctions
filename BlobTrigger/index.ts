import { AzureFunction, Context } from "@azure/functions"
import { PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log(
        "Blob trigger function processed blob \n Name:", 
        context.bindingData.name, 
        "\n Blob Size:", 
        myBlob.length, 
        "Bytes"
    );

    try {
        await PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME(context.bindingData.name, new Date()); 
    }
    catch( err ) {
        context.log(err)
    }
};

export default blobTrigger;
