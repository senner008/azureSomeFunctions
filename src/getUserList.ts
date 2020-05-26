

function getUserList(myBlob : any): string[] {
    const base64data = Buffer.from(myBlob, 'binary').toString('base64');
    return Buffer.from(base64data, 'base64').toString().split('\n');
}

export {
    getUserList
}