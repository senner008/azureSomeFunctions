import { mssqlDate, mssqlDateSubtractDays } from "../../src/mssqlDate";

const DATE_NOW_STUB  = mssqlDate(new Date());
const DATE_TWENTY_NINE_DAYS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 29);
const DATE_THIRTY_DAYS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 30);

export {
    DATE_NOW_STUB,
    DATE_TWENTY_NINE_DAYS_AGO_STUB,
    DATE_THIRTY_DAYS_AGO_STUB
}