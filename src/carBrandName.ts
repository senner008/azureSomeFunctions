const xss = require("xss");

function getCarBrandName(myBlob : any) {
    const base64data = Buffer.from(myBlob, 'binary').toString('base64');
    const firstLine = Buffer.from(base64data, 'base64').toString().split('\n')[0];
    return firstLine;
}


function carBrandValidate(carbrand : string) {
    if (carbrand.length > 50 || xss(carbrand) !== carbrand) {
        throw "Invalid input!" 
    }
}

export {
    getCarBrandName,
    carBrandValidate
}