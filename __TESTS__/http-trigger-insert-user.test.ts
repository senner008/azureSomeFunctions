import httpTriggerIsertUser from "../HttpTriggerInsertUser/index"
const context = require('./__STUBS__/DEFAULT_CONTEXT')
const fs = require('fs');

function getEnvironmentPassword () {
    if (process.env.ENVIRONMENT === "DEVELOPMENT") {
        const rawdata = fs.readFileSync('local.settings.json');
        return JSON.parse(rawdata).Values.MYSECRET_PASSWORD;
    } else {
        return process.env.MYSECRET_PASSWORD;
    }
}



describe(
    `
        Call Http trigger insert user with valid request body
    `,
    () => {

        it('should insert user', async () => {

            process.env.MYSECRET_PASSWORD = getEnvironmentPassword();
            const body = {
                "password" : getEnvironmentPassword(),
                "user_name" : "Superman",
                "user_time_to_live": "2029-08-30 12:00:00"
            }

            const result = await httpTriggerIsertUser(context, {body});

            expect(result.body).toEqual("User inserted!");
        })
});