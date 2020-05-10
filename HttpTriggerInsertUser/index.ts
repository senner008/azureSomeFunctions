import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import IResponseObject from "../src/IResponseObject";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<IResponseObject> {

    const password = req.body && req.body.password ? req.body.password : "";

    if (!password || !req.body.user_name) {
        return {
            status: 400,
            body: "Bad request"
        }
    }

    if (password === process.env.MYSECRET_PASSWORD) {
        return await insertUser(req);
    }

    return {
        status: 401,
        body: "Unauthorized"
    }

};

async function insertUser (req : HttpRequest) {
    try {
        await STORED_PROCEDURE_INSERT_USER(req.body.user_name, new Date());
        return {
            status: 201,
            body: "User inserted!"
        }
    } catch (err) {
        return {
            status: err.statusCode,
            body: err.message
        }
    }
}

export default httpTrigger;
