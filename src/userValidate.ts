const xss = require("xss");
export default function userNameValidate(user : string) {
    if (user.length > 50 || xss(user) !== user) {
        throw "Invalid input!" 
    }
}
