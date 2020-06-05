declare const dayShortList: string[];
declare const dayList: string[];
declare const monthShortList: string[];
declare const monthList: string[];
export declare function addDays(d: Date, days: number): Date;
export declare function addMonths(d: Date, months: number): Date;
export declare function addYears(d: Date, years: number): Date;
export declare function cloneDate(d: Date): Date;
export declare function cloneAsDate(d: Date): Date;
export declare function getFirstDayOfMonth(d: Date): Date;
export declare function getLastDayOfMonth(d: Date): Date;
export declare function getLastDayOfPrevMonth(d: Date): Date;
export { dayShortList, dayList, monthShortList, monthList };