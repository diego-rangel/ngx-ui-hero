export class InputMonthYearLanguage {
    days: Array<string>;
    daysMin: Array<string>;
    months: Array<string>;

    constructor (days: Array<string>, daysMin: Array<string>, months: Array<string>) {
        this.days = days;
        this.daysMin = daysMin;
        this.months = months;
    }
}
