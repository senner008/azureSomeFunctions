import { AzureFunction, Context } from "@azure/functions"
import { getUserList } from "../src/getUserList";
import userNameValidate from "../src/userValidate";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import extractUserAndTimeToLive from "../src/extractUserAndTimeToLive";
import userTimeToLiveValidate from "../src/userTimeToLiveValidate";
import { sendEmail } from "../src/sendEmail";
var moment = require('moment');
moment().format();

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log(
        "Blob trigger function processed blob \n Name:", 
        context.bindingData.name, 
        "\n Blob Size:", 
        myBlob.length, 
        "Bytes"
    );
    const password = process.env.EMAIL_PASSWORD
    const filename: string = context.bindingData.name.toString();
  
    try {
       
        const userList = getUserList(myBlob);
        for (const userInfo of userList) {
             const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);
             userNameValidate(userName);
             userTimeToLiveValidate(timeToLive);
        }
        for (const userInfo of userList) {
            const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);
            await STORED_PROCEDURE_INSERT_USER(userName, new Date(), moment(timeToLive).format()); 
            const logMessage =  `A user by the name of ${userInfo} was inserted from the file ${filename}`
         
            context.log
            (
                logMessage
            );
        } 
        await sendEmail(
            "Blob storage file added successfully", 
            filename.split(".")[0] + " file added. Users retrieved",
            password
        );
        
    }
    catch( err ) {
        await sendEmail(
            "Error in storage file.", 
            filename.split(".")[0] + " file added. Users not retrieved",
            password
        );
    }
};


export default blobTrigger;
