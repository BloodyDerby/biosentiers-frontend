import { BiosentiersFrontendPage } from './app.po';

describe('biosentiers-frontend App', function() {
  let page: BiosentiersFrontendPage;

  beforeEach(() => {
    page = new BiosentiersFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('bio works!');
  });
});
