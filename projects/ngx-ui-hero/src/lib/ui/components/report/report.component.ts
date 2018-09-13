import { Component, Input } from '@angular/core';

declare var $: any;

let identifier = 0;

@Component({
  selector: 'ui-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  @Input() reportTitle: string = ' ';
  public identifier = `ui-report-${identifier++}`;

  constructor() { }

  Print(): void {
    $(`#${this.identifier}`).printThis({
      debug: false,               // show the iframe for debugging
      importCSS: true,            // import parent page css
      importStyle: true,         // import style tags
      printContainer: true,       // print outer container/$.selector
      loadCSS: "",                // path to additional css file - use an array [] for multiple
      pageTitle: this.reportTitle,              // add title to print page
      removeInline: false,        // remove inline styles from print elements
      removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
      printDelay: 333,            // variable print delay
      header: '',               // prefix to html
      footer: '',               // postfix to html
      base: false,                // preserve the BASE tag or accept a string for the URL
      formValues: true,           // preserve input/form values
      canvas: false,              // copy canvas content
      //doctypeString: '...',       // enter a different doctype for older markup
      removeScripts: false,       // remove script tags from print content
      copyTagClasses: false,      // copy classes from the html & body tag
      beforePrintEvent: null, // function for printEvent in iframe
      beforePrint: null,          // function called before iframe is filled
      afterPrint: null            // function called before iframe is removed
    });
  }

}
