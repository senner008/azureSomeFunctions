import httpTriggerIsertUser from "../HttpTriggerInsertUser/index"
const context = require('./__STUBS__/DEFAULT_CONTEXT')
const fs = require('fs');
const rawdata = fs.readFileSync('local.settings.json');
const data = JSON.parse(rawdata);

describe(
    `
        Call Http trigger insert user with valid request body
    `,
    () => {

        it('should insert user', async () => {

            process.env.MYSECRET_PASSWORD = data.Values.MYSECRET_PASSWORD;
            const body = {
                "password" : data.Values.MYSECRET_PASSWORD,
                "user_name" : "Superman",
                "user_time_to_live": "2029-08-30 12:00:00"
            }

            const result = await httpTriggerIsertUser(context, {body});

            expect(result.body).toEqual("User inserted!");
        })
});