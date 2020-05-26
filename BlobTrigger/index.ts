import { AzureFunction, Context } from "@azure/functions"
import { getUserList } from "../src/getUserList";
import userNameValidate from "../src/userValidate";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";

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
        for (const user of userList) {
            const [userName, timeToLive] = user.split(',')
            userNameValidate(user);
            await STORED_PROCEDURE_INSERT_USER(userName, new Date(), new Date(timeToLive)); 
        
            context.log
            (
                `A user by the name of ${user} was inserted from the file ${context.bindingData.name}`
            );
        }

        }
    catch( err ) {
        context.log(err)
    }
};


export default blobTrigger;
