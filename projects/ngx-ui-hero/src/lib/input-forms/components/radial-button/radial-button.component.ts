import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-radial-button',
  templateUrl: './radial-button.component.html',
  styleUrls: ['./radial-button.component.scss']
})
export class RadialButtonComponent implements OnInit {
  @Input() label: string;
  @Input() labelPlacement: string = 'bottom';
  @Input() iconClass: string;
  @Input() backgroundColorClass?: string = 'btn-primary';

  constructor() { }

  ngOnInit() {
  }

}
