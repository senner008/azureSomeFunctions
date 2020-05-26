import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import { getUTC } from "../src/mssqlDate";
import { DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100 } from "./__STUBS__/DATE_STUBS";
import { STORED_PROCEDURE_DELETE_USER } from "../src/SQL/PROCEDURES/PROCEDURE_DELETE_USER";

describe(
  `
    SQL stored procedure STORED_PROCEDURE_GET_USERS
  `,
  () => {

    it('should return users from db', async (done) => {
      await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100)
      await STORED_PROCEDURE_INSERT_USER("Superman", DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100)
      const users: IUser[] = await STORED_PROCEDURE_GET_USERS();

      const expectedUsers: IUser[] =
        [
          {
            user_id: 1,
            user_name: "Batman",
            user_created_at: getUTC(DATE_NOW_STUB),
            user_time_to_live : getUTC(DATE_NOW_STUB_PLUS_SECONDS_100)
          },
          {
            user_id: 2,
            user_name: "Superman",
            user_created_at: getUTC(DATE_NOW_STUB),
            user_time_to_live : getUTC(DATE_NOW_STUB_PLUS_SECONDS_100)
          }
        ];

      expect(users).toEqual(expectedUsers)
      done();
    });
  });

describe(
  `
      SQL stored procedure STORED_PROCEDURE_INSERT_USER with valid parameters
    `,
  () => {

    it('should execute without throwing', async (done) => {
      var error;
      try {
        await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100)
      } catch (err) {
        error = err;
      }

      expect(error).toBeUndefined();
      done();
    });
  });

describe(
  `
        SQL stored procedure STORED_PROCEDURE_DELETE_USER with valid parameters
      `,
  () => {

    it('should delete user', async (done) => {

      await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB, DATE_NOW_STUB_PLUS_SECONDS_100);

      await STORED_PROCEDURE_DELETE_USER(1);

      var error;
      try {
        await STORED_PROCEDURE_GET_USERS();
      } catch (err) {
        error = err;
      }
      expect(error).toEqual({ "message": "Users not found!", "statusCode": 404 });
      done();
    });
  });


