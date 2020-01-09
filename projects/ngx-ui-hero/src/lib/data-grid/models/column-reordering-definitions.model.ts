export class ColumnReorderingDefinitionsModel {
    key: string;
    data: Array<ColumnReorderingDefinitionsItemModel>;
}

export class ColumnReorderingDefinitionsItemModel {
    caption: string;
    originalIndex: number;
    userIndex: number;
}