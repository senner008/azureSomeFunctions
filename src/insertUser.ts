import userNameValidate from "./userValidate";
import userTimeToLiveValidate from "./userTimeToLiveValidate";
import { STORED_PROCEDURE_INSERT_USER } from "./SQL/PROCEDURES/PROCEDURE_INSERT_USER";

async function insertUser (userName: string, timeToLive: string) {
    userNameValidate(userName);
    userTimeToLiveValidate(timeToLive);
    await STORED_PROCEDURE_INSERT_USER(userName, new Date(), new Date(timeToLive)); 
}

export {
    insertUser
}