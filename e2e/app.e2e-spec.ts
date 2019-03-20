import { GettingStartPage } from './app.po';

describe('getting-start App', () => {
  let page: GettingStartPage;

  beforeEach(() => {
    page = new GettingStartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
