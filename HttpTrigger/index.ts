import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_GET_USERS } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const users = await STORED_PROCEDURE_GET_USERS();
    if (name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: users
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
