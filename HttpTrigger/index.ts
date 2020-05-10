import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import IResponseObject from "../src/IResponseObject";

const httpTrigger: AzureFunction = 
    async function (context: Context, req: HttpRequest) {
    
    try {
        const users = await STORED_PROCEDURE_GET_USERS();
        context.res  = {
            status : 200,
            body : JSON.stringify(users),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
    }
    catch( err ) {
        context.res  = {
            status : err.status,
            body : err.message
        }
    }
};

export default httpTrigger;
