import { Directive, Input, Output, Renderer2, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[debounce]'
})
export class DebounceDirective implements OnInit {

  @Input() delay = 500;
  @Output() callback = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const event = fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.delay)
      )
      .subscribe((input: any) => this.callback.emit());
  }

}
