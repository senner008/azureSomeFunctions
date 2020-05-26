const xss = require("xss");
export default function userNameValidate(carbrand : string) {
    if (carbrand.length > 50 || xss(carbrand) !== carbrand) {
        throw "Invalid input!" 
    }
}
