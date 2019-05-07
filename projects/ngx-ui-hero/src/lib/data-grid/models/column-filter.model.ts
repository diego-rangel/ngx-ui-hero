import { DataGridColumnModel } from './data-grid-column.model';

export class ColumnFilterModel {
    constructor(
        public filter: any, 
        public column: DataGridColumnModel, 
        public operator: Operator
    ){};
}

export interface Operator {
    symbol: string;
    validate(filter: any, value: any): boolean;
}
export class ContainsOperator implements Operator {
    symbol: string = '...';

    validate(filter: string, value: string): boolean {
        return value != undefined
            && value != null
            && value.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
    }
}
export class EqualsOperator implements Operator {
    symbol: string = '=';

    validate(filter: any, value: any): boolean {
        return filter == value;
    }
}
export class DifferentOperator implements Operator {
    symbol: string = '!=';

    validate(filter: any, value: any): boolean {
        return filter != value;
    }
}
export class GreaterThanOperator implements Operator {
    symbol: string = '>';

    validate(filter: any, value: any): boolean {
        return filter > value;
    }
}
export class GreaterThanOrEqualsToOperator implements Operator {
    symbol: string = '>=';

    validate(filter: any, value: any): boolean {
        return filter >= value;
    }
}
export class LessThanOperator implements Operator {
    symbol: string = '<';

    validate(filter: any, value: any): boolean {
        return filter < value;
    }
}
export class LessThanOrEqualsToOperator implements Operator {
    symbol: string = '<=';

    validate(filter: any, value: any): boolean {
        return filter <= value;
    }
}
export class IsTrueOperator implements Operator {
    symbol: string = '';

    validate(filter: any, value: any): boolean {
        return value;
    }
}
export class IsFalseOperator implements Operator {
    symbol: string = '';

    validate(filter: any, value: any): boolean {
        return !value;
    }
}