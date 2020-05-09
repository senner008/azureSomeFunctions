import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";

import { mssqlDate, getUTC } from "../src/mssqlDate";
import { DATE_NOW_STUB } from "./DATE_NOW_STUB";

describe(
  `
    SQL stored procedure STORED_PROCEDURE_GET_USERS
  `,
  () => {

    it('should return users from db', async (done) => {
        await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB)
        await STORED_PROCEDURE_INSERT_USER("Superman", DATE_NOW_STUB)
        const users : IUser[] = await STORED_PROCEDURE_GET_USERS();

        const expectedUsers : IUser[] = 
          [
            {
                user_id: 1, 
                user_name: "Batman",
                user_created_at : getUTC(DATE_NOW_STUB) 
            }, 
            {   
                user_id: 2, 
                user_name: "Superman",
                user_created_at : getUTC(DATE_NOW_STUB)
            }
        ];

        expect(users).toEqual(expectedUsers)
      done();
    });
});


