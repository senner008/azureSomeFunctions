import { STORED_PROCEDURE_GET_USERS, IUser } from "../src/SQL/PROCEDURES/PROCEDURE_GET_USERS";
import Evaluator from "../src/Evaluator";
import { STORED_PROCEDURE_INSERT_USER } from "../src/SQL/PROCEDURES/PROCEDURE_INSERT_USER";
import { DATE_NOW_STUB, DATE_TWO_MONTHS_AGO_STUB, DATE_FOURTEEN_DAYS_AGO_STUB } from "./DATE_NOW_STUB";
import { STORED_PROCEDURE_DELETE_USER } from "../src/SQL/PROCEDURES/PROCEDURE_DELETE_USER";

describe(
  `
    Evaluate user created now
  `,
  () => {

    it('should not delete user', async (done) => {

        await STORED_PROCEDURE_INSERT_USER("Batman", DATE_NOW_STUB)
        const users = await STORED_PROCEDURE_GET_USERS();    

        for (let user of users) {
          await new Evaluator(user)
            .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
            .evaluate();
        }
        
        const usersAfterEvaluation : IUser[] = await STORED_PROCEDURE_GET_USERS();

        expect(usersAfterEvaluation[0].user_name).toEqual("Batman");  
      
      done();
    });
});


describe(
  `
    Evaluate user created 14 days ago
  `,
  () => {

    it('should not delete user', async (done) => {

        await STORED_PROCEDURE_INSERT_USER("Batman", DATE_FOURTEEN_DAYS_AGO_STUB)
        const users = await STORED_PROCEDURE_GET_USERS();    

        for (let user of users) {
          await new Evaluator(user)
            .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
            .evaluate();
        }

        const usersAfterEvaluation : IUser[] = await STORED_PROCEDURE_GET_USERS();

        expect(usersAfterEvaluation[0].user_name).toEqual("Batman");  
      
      done();
    });
});


describe(
  `
    Evaluate user created 2 months ago
  `,
  () => {

    it('should return delete user', async (done) => {

        await STORED_PROCEDURE_INSERT_USER("Batman", DATE_TWO_MONTHS_AGO_STUB)
        const users = await STORED_PROCEDURE_GET_USERS();    

        for (let user of users) {
          await new Evaluator(user)
            .ifDueToBeDeleted(() => STORED_PROCEDURE_DELETE_USER(user.user_id))
            .evaluate();
        }

        var error; 
        try {
          const usersAfterEvaluation : IUser[] = await STORED_PROCEDURE_GET_USERS();
        } catch (err) {
          error = err;
        }

        expect(error.message).toEqual("Users not found!")    
      
      done();
    });
});




