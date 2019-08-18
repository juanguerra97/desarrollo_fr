import { CoreUIPage } from './app.po';

// @ts-ignore
describe('core-ui App', function() {
  let page: CoreUIPage;

  // @ts-ignore
  beforeEach(() => {
    page = new CoreUIPage();
  });

  // @ts-ignore
  it('should display footer containing creativeLabs', () => {
    page.navigateTo();
    // @ts-ignore
    expect(page.getParagraphText()).toContain('creativeLabs');
  });
});
