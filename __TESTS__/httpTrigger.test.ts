import httpTrigger from "../HttpTrigger/index"
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import { DATE_NOW_STUB } from "./__STUBS__/DATE_STUBS";
const context = require('./__STUBS__/DEFAULT_CONTEXT')


describe(
    `
      Evaluate user created now
    `,
    () => {

        it('Http trigger should return known text', async () => {

            const request = {
                query: { name: 'Bill' }
            };
            await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB)
            await httpTrigger(context, request);

            expect(context.log.mock.calls.length).toBe(1);
            expect(context.res.body[0].user_name).toEqual("Batman");
        })
    });