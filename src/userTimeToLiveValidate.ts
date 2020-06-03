var moment = require('moment');
function userTimeToLiveValidate (date : string) {
    const momentDate = moment(date);
    if (!momentDate.isValid()) {
        throw "Invalid date!"
    }
}

export default userTimeToLiveValidate