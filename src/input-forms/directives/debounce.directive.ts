import { Directive, Input, Output, Renderer2, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
    const event = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .debounceTime(this.delay)
      .distinctUntilChanged()
      .subscribe((input: any) => this.callback.emit());
  }

}
