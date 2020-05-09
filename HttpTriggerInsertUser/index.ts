import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const password = req.body && req.body.password ? req.body.password : "";

    if (!password || !req.body.user_name) {
        context.res = {
            status: 400,
            body: "Bad request"
        };
        return;
    }

    if (password === process.env.MYSECRET_PASSWORD) {
        try {
            await STORED_PROCEDURE_INSERT_USER(req.body.user_name, new Date());
            context.res = {
                status: 200,
                body: "User inserted"
            };
        } catch(err) {
            context.res = {
                status: 400,
                body: err.message
            };
        }
    }
    else {
        context.res = {
            status: 401,
            body: "Unauthorized"
        };
    }
};

export default httpTrigger;
