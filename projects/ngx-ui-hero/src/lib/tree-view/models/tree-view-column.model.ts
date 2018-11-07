export class TreeViewColumnModel {
    caption: string = '';
    width: string;
    captionAlignment?: EnumAlignment = EnumAlignment.Left;
    captionClasses?: string = '';
    data?: string = '';
    dataAlignment?: EnumAlignment = EnumAlignment.Left;
    dataClasses?: string = '';
    editable?: boolean = false;
    dataType?: EnumTreeViewColumnDataType = EnumTreeViewColumnDataType.Text;
    render?(row: any, currentData: any, rowIndex: number): string;
    onClick?(row: any, currentData: any, rowIndex: number): void;
}

export enum EnumAlignment {
    Left = 0,
    Center = 1,
    Right = 2
}

export enum EnumTreeViewColumnDataType {
    Text = 0,
    Date = 1,
    Number = 2,
    Currency = 3,
    Percent = 4
}
