import httpTrigger from "../HttpTrigger/index"
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import { DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100 } from "./__STUBS__/DATE_STUBS";
import extractUserAndTimeToLive from "../src/extractUserAndTimeToLive";
import userTimeToLiveValidate from "../src/userTimeToLiveValidate";
const context = require('./__STUBS__/DEFAULT_CONTEXT')

describe(
    `
      Extract user info
    `,
    () => {

        it('should extract user name', async () => {

            const userInfo = "Buller, 2029-08-28 12:00:00"
            const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);

            expect(userName).toEqual('Buller');
        });

        it('should extract user time to live date', async () => {

            const userInfo = "Buller , 2029-08-28 12:00:00"
            const [userName, timeToLive] = extractUserAndTimeToLive(userInfo);

            expect(timeToLive.trim()).toEqual('2029-08-28 12:00:00');
        });

        
        it('should not throw when date is valid', async () => {

            const timeToiLive = "2029-08-28 12:00:00";
            let result;
            try {
                userTimeToLiveValidate(timeToiLive);
            } catch (err) {
                result = err;
            }

            expect(result).toBeUndefined();
        });

        it('should throw when date is valid', async () => {

            const timeToiLive = "foo";
            let result;
            try {
                userTimeToLiveValidate(timeToiLive);
            } catch (err) {
                result = err;
            }

            expect(result).toEqual("Invalid date!");
        });

    });