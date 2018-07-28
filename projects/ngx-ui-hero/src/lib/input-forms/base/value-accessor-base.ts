import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;
  private changed = new Array<(value: T) => void>();
  private isTouched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }
  set value(value: T) {
    console.log('setou', value)
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));

      if (this.OnValueChanged) {
        this.OnValueChanged();
      }
    }
  }

  touch() {
    this.isTouched.forEach(f => f());
  }
  writeValue(value: T) {
    console.log('writeValue', value)
    this.innerValue = value;
  }
  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }
  registerOnTouched(fn: any): void {
    this.isTouched.push(fn);
  }

  abstract OnValueChanged(): void;
}
