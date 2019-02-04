import { TutorialService } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  constructorCode = `
import { TutorialService } from 'ngx-ui-hero';

constructor(
  private tutorialService: TutorialService
) {}
`;

  demoHtmlCode = `
<button class="btn btn-primary" [tutorial]="{ title: 'My help title', text: 'Hello Wold!' }">Hello Wold!</button>
  `;

  tutorialServicePlayCode = `
this.tutorialService.playAll();
  `;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
    
  }

  play(): void {
    this.tutorialService.playAll();
  }

}
