import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const password = req.body && req.body.password ? req.body.password : "";

    if (!password || !req.body.reset_database) {
        context.res = {
            status: 400,
            body: "Bad request"
        };
        return;
    }

    if (password === process.env.MYSECRET_PASSWORD) {
       if (req.body.reset_database === "true") {
           await setupTable();
           context.res = {
                body: "Database cleared"
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
