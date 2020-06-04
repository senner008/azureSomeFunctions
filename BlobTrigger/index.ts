import { AzureFunction, Context } from "@azure/functions"
import { getUserList } from "../src/getUserList";
import userNameValidate from "../src/userValidate";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import extractUserAndTimeToLive from "../src/extractUserAndTimeToLive";
import userTimeToLiveValidate from "../src/userTimeToLiveValidate";
import { sendEmail } from "../src/sendEmail";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    const blobProcess =  
        `Blob trigger function processed blob Name: 
        ${context.bindingData.name} 
        Blob Size: 
        ${myBlob.length}
        Bytes`
    context.log(
        blobProcess
    );

    try {
        const userList = getUserList(myBlob);
        for (const userInfo of userList) {
             const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);
             userNameValidate(userName);
             userTimeToLiveValidate(timeToLive);
        }
        for (const userInfo of userList) {
            const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);
            await STORED_PROCEDURE_INSERT_USER(userName, new Date(), new Date(timeToLive)); 
            const password = process.env.EMAIL_PASSWORD
            const logMessage =  `A user by the name of ${userInfo} was inserted from the file ${context.bindingData.name}`

            context.log
            (
                logMessage
            );
        }
        await sendEmail(
            blobProcess, 
            `the file ${context.bindingData.name} was added`
        );
    }
    catch( err ) {

        await sendEmail(
            blobProcess, 
            err
        );
        context.log
        (
            err
        );
    }
};


export default blobTrigger;
