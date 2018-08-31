import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-radial-button',
  templateUrl: './radial-button.component.html',
  styleUrls: ['./radial-button.component.scss']
})
export class RadialButtonComponent implements OnInit {
  @Input() disabled?: boolean = false;
  @Input() label: string;
  @Input() labelPlacement: string = 'bottom';
  @Input() iconClass: string;
  @Input() backgroundColorClass?: string = 'btn-primary';
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
