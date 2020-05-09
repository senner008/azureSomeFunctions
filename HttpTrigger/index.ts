import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_GET_USERS } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    try {
        const users = await STORED_PROCEDURE_GET_USERS();
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: users
        };
    }
    catch( err ) {
        context.res = {
            status: 500,
            body: "Server error. Users not retrieved"
        };
    }
};

export default httpTrigger;
