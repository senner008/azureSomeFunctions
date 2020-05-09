import { mssqlDate, mssqlDateSubtractDays } from "../../src/mssqlDate";

const DATE_NOW_STUB  = mssqlDate(new Date());

const DATE_FOURTEEN_DAYS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 14);

const DATE_TWO_MONTHS_AGO_STUB  = mssqlDateSubtractDays(new Date(), 60);

export {
    DATE_NOW_STUB,
    DATE_FOURTEEN_DAYS_AGO_STUB,
    DATE_TWO_MONTHS_AGO_STUB
}