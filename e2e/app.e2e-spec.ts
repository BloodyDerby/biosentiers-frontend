import { BiosentiersFrontendPage } from './app.po';

describe('biosentiers-frontend App', function() {
  let page: BiosentiersFrontendPage;

  beforeEach(() => {
    page = new BiosentiersFrontendPage();
  });

  it('should display the title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BioSentiers');
  });
});
