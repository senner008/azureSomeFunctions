var moment = require('moment');
moment().format();

function dateFormat (momentDate : any) {
    return momentDate.format("YYYY-MM-DD HH:mm:ss");
}

function mssqlDate (date : any) {
    return dateFormat(moment(date));
}

function mssqlDateSubtractDays (date : any, days) {
    return dateFormat(moment(date).subtract(days, "days"));
}

function mssqlDateNowIsOneMonthAfter(date : any) {
    const diff = moment(date).diff(moment(new Date()), 'months');
    return Math.abs(diff) >= 1;
}

function getUTC (date : any) {
    return moment(date).utc().toDate(); 
}

export { 
    mssqlDate, 
    mssqlDateNowIsOneMonthAfter,
    mssqlDateSubtractDays,
    getUTC
}
