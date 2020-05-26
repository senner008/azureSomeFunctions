import { mssqlDate, mssqlDateSubtractDays, mssqlDateAddSeconds } from "../../src/mssqlDate";

const DATE_NOW_STUB  = mssqlDate(new Date());
const DATE_NOW_STUB_PLUS_SECONDS_100  = mssqlDateAddSeconds(new Date(), 100);
const DATE_TWENTY_NINE_DAYS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 29);
const DATE_THIRTY_DAYS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 30);

export {
    DATE_NOW_STUB,
    DATE_NOW_STUB_PLUS_SECONDS_100,
    DATE_TWENTY_NINE_DAYS_AGO_STUB,
    DATE_THIRTY_DAYS_AGO_STUB
}