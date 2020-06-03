import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import IResponseObject from "../src/IResponseObject";
import userNameValidate from "../src/userValidate";
import userTimeToLiveValidate from "../src/userTimeToLiveValidate";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<IResponseObject> {

    const password = req.body && req.body.password ? req.body.password : "";

    if (!password || !req.body.user_name || !req.body.user_time_to_live) {
        return {
            status: 400,
            body: "Bad request"
        }
    }

    if (password === process.env.MYSECRET_PASSWORD) {
        try {
            await insertUser(req.body.user_name, req.body.user_time_to_live);
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

    return {
        status: 401,
        body: "Unauthorized"
    }

};

async function insertUser (userName: string, timeToLive: string) {
    userNameValidate(userName);
    userTimeToLiveValidate(timeToLive);
    await STORED_PROCEDURE_INSERT_USER(userName, new Date(), new Date(timeToLive)); 
}

export {
    insertUser
}

export default httpTrigger;
