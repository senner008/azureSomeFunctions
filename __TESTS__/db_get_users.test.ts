import { STORED_PROCEDURE_GET_USERS } from "../src/SQL/stored_procedure";

describe(
  `
    SQL stored procedure STORED_PROCEDURE_GET_USERS
  `,
  () => {

    it('should return users from db', async (done) => {
        const users = await STORED_PROCEDURE_GET_USERS();
        expect(users).toEqual(
            [
                {
                    "user_id": 0, 
                    "user_name": "Batman"
                }, 
                {   
                    "user_id": 1, 
                    "user_name": "Superman"
                }
            ]
        )
      done();
    });
});


