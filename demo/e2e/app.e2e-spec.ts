import { NgxUiHeroDemoPage } from './app.po';

describe('ngx-ui-hero-demo App', () => {
  let page: NgxUiHeroDemoPage;

  beforeEach(() => {
    page = new NgxUiHeroDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
