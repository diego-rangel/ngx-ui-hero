import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-ui-hero';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  teste: string;

  constructor() {}

  ngOnInit() {
  }

}
