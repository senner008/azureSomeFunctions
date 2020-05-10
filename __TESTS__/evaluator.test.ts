import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import Evaluator from "../src/Evaluator";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import {
  DATE_NOW_STUB, DATE_THIRTY_DAYS_AGO_STUB,
  DATE_TWENTY_NINE_DAYS_AGO_STUB
} from "./__STUBS__/DATE_STUBS";
import { STORED_PROCEDURE_DELETE_USER } from "../src/SQL/PROCEDURES/PROCEDURE_DELETE_USER";

describe(
  `
    Evaluate user created 29 days ago
  `,
  () => {

    it('should not delete user', async (done) => {

      await STORED_PROCEDURE_INSERT_USER("Batman", DATE_TWENTY_NINE_DAYS_AGO_STUB)
      const users = await STORED_PROCEDURE_GET_USERS();

      for (let user of users) {
        await new Evaluator(user)
          .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
          .evaluate();
      }

      const usersAfterEvaluation: IUser[] = await STORED_PROCEDURE_GET_USERS();

      expect(usersAfterEvaluation[0].user_name).toEqual("Batman");

      done();
    });
  });

describe(
  `
    Evaluate user created 30 days ago
  `,
  () => {

    it('should delete user', async (done) => {

      await STORED_PROCEDURE_INSERT_USER("Batman", DATE_THIRTY_DAYS_AGO_STUB)
      const users = await STORED_PROCEDURE_GET_USERS();

      for (let user of users) {
        await new Evaluator(user)
          .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
          .evaluate();
      }

      var error;
      try {
        const usersAfterEvaluation: IUser[] = await STORED_PROCEDURE_GET_USERS();
      } catch (err) {
        error = err;
      }

      expect(error.message).toEqual("Users not found!")

      done();
    });
  });

describe(
  `
      Evaluate multiple users
    `,
  () => {

    it('should delete 1 out of two users', async (done) => {

      await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB)
      await STORED_PROCEDURE_INSERT_USER("Superman", DATE_THIRTY_DAYS_AGO_STUB)
      const users = await STORED_PROCEDURE_GET_USERS();

      for (let user of users) {
        await new Evaluator(user)
          .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
          .evaluate();
      }

      const usersAfterEvaluation: IUser[] = await STORED_PROCEDURE_GET_USERS();

      expect(usersAfterEvaluation.length).toEqual(1);

      done();
    });
  });




