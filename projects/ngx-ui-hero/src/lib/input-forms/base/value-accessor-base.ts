import { ControlValueAccessor } from '@angular/forms';

const noop = () => {};

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;
  private _onChangeCallback: (_:any) => void = noop;
  private _onTouchedCallback: (_:any) => void = noop;
  protected internallyTouched: boolean;

  get value(): T {
    return this.innerValue;
  }
  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this._onChangeCallback(value);
    }
  }

  touch() {
    this.internallyTouched = true;
  }
  writeValue(value: T) {
    this.innerValue = value;
  }
  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }
}
