import { StellarTestPage } from './app.po';

describe('stellar-test App', () => {
  let page: StellarTestPage;

  beforeEach(() => {
    page = new StellarTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
