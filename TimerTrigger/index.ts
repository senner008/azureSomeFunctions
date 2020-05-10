import { AzureFunction, Context } from "@azure/functions"
import { STORED_PROCEDURE_GET_USERS } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import Evaluator from "../src/Evaluator";
import { STORED_PROCEDURE_DELETE_USER } from "../src/SQL/PROCEDURES/PROCEDURE_DELETE_USER";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.IsPastDue)
    {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran again!', timeStamp);  

    var users;
    try {
        users = await STORED_PROCEDURE_GET_USERS();    
    } catch (err) {
        return;
    }
    for (const user of users) {
        await new Evaluator(user)
            .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
            .evaluate();
    }
};

export default timerTrigger;
