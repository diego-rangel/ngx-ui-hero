export declare class InputManager {
    private htmlInputElement;
    private _storedRawValue;
    constructor(htmlInputElement: any);
    setCursorAt(position: number): void;
    updateValueAndCursor(newRawValue: string, oldLength: number, selectionStart: number): void;
    readonly canInputMoreNumbers: boolean;
    readonly inputSelection: any;
    rawValue: string;
    readonly storedRawValue: string;
}
