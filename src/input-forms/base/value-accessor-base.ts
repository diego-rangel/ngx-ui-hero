import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;
  private changed = new Array<(value: T) => void>();
  private isTouched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }
  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    this.isTouched.forEach(f => f());
  }
  writeValue(value: T) {
    this.innerValue = value;
  }
  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }
  registerOnTouched(fn: any): void {
    this.isTouched.push(fn);
  }
}
