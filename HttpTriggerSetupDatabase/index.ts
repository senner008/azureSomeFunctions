import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { setupTable } from "../src/SQL/db_setup"
import IResponseObject from "../src/IResponseObject";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<IResponseObject> {

    const password = req.body && req.body.password ? req.body.password : "";

    if (!password || !req.body.reset_database) {
        return {
            status: 400,
            body: "Bad request"
        }
    }

    if (password === process.env.MYSECRET_PASSWORD && req.body.reset_database === "true") {
        await setupTable();
        return {
            status : 200,
            body : "Database cleared and ready"
        }
    }

    return {
        status: 401,
        body: "Unauthorized"
    }  
};

export default httpTrigger;
