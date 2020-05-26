import { mssqlDateNowIsOneMonthAfter, mssqlDateNowIsAfterTimeToLive } from "./mssqlDate";
import { IUser } from "./SQL/PROCEDURES/PROCEDURE_GET_USERS";

class Evaluator implements IEvaluator {
    private user: IUser;
    public evaluate: Function = () => {}
    private validationIsSet: boolean = false;
    
    constructor(user: IUser) {
        this.user = user;
    }
    
    ifDueToBeDeleted(func: any): this {
        console.log(new Date())
        console.log(this.user.user_time_to_live)
        return this._setValidationState(
            mssqlDateNowIsAfterTimeToLive(this.user.user_time_to_live),
            func);
    }

    private _setValidationState(expression: boolean, func: any) : this {
        if (!this.validationIsSet && expression) {
            this.evaluate = func;
            this.validationIsSet = true;
        }
        return this;
    }
}

interface IEvaluator {
    ifDueToBeDeleted : (func: any) => this;
}


export default Evaluator;