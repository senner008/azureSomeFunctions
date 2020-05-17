import { AzureFunction, Context } from "@azure/functions"
import { PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME";
import { carBrandValidate, getCarBrandName } from "../src/carBrandName";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log(
        "Blob trigger function processed blob \n Name:", 
        context.bindingData.name, 
        "\n Blob Size:", 
        myBlob.length, 
        "Bytes"
    );

    try {
        const carBrandName = getCarBrandName(myBlob);
        carBrandValidate(carBrandName);
        await PROCEDURE_INSERT_BLOB_UPLOAD_FILE_NAME(context.bindingData.name, carBrandName, new Date()); 
        
        context.log
        (
            `A file by the name of ${context.bindingData.name} was inserted with a value of ${carBrandName}`
        );

        }
    catch( err ) {
        context.log(err)
    }
};


export default blobTrigger;
