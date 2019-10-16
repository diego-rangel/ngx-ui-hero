import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[debounce]'
})
export class DebounceDirective implements OnInit {
  @Input() delay = 500;
  @Output() callback = new EventEmitter();
  @Output() arrowsCallback = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const event1 = fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.delay),
      )
      .subscribe((input: any) => {
        if (input.keyCode < 37 || input.keyCode > 40) {
          this.callback.emit(input);
        }        
      });

    const event2 = fromEvent(this.elementRef.nativeElement, 'keyup')
      .subscribe((input: any) => {
        if (input.keyCode == 13 || (input.keyCode >= 37 && input.keyCode <= 40)) {
          this.arrowsCallback.emit(input);
        } 
      });
  }

}
