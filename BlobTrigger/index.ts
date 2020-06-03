import { AzureFunction, Context } from "@azure/functions"
import { getUserList } from "../src/getUserList";
import userNameValidate from "../src/userValidate";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import extractUserAndTimeToLive from "../src/extractUserAndTimeToLive";
import userTimeToLiveValidate from "../src/userTimeToLiveValidate";
import { insertUser } from "../src/insertUser";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log(
        "Blob trigger function processed blob \n Name:", 
        context.bindingData.name, 
        "\n Blob Size:", 
        myBlob.length, 
        "Bytes"
    );

    try {
        const userList = getUserList(myBlob);
        for (const userInfo of userList) {
            const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);
            await insertUser(userName, timeToLive); 
            context.log
            (
                `A user by the name of ${userInfo} was inserted from the file ${context.bindingData.name}`
            );
        }

        }
    catch( err ) {
        context.log(err)
    }
};


export default blobTrigger;
