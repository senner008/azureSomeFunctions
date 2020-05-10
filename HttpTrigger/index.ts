import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import IResponseObject from "../src/IResponseObject";

const httpTrigger: AzureFunction = 
    async function (context: Context, req: HttpRequest): Promise<IUser[] | IResponseObject> {
    
    try {
        return await STORED_PROCEDURE_GET_USERS();
    }
    catch( err ) {
       return {
           status : err.status,
           body : err.message
       }
    }
};

export default httpTrigger;
