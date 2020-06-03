import httpTrigger from "../HttpTrigger/index"
import httpTriggerIsertUser from "../HttpTriggerInsertUser/index"

import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import { DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100 } from "./__STUBS__/DATE_STUBS";
const context = require('./__STUBS__/DEFAULT_CONTEXT')

describe(
    `
      Call Http trigger get users
    `,
    () => {

        it('should return users', async () => {

            await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100)
            await httpTrigger(context, {});

            expect(JSON.parse(context.res.body)[0].user_name).toEqual('Batman');
        })
    });
