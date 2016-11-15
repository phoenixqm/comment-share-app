import { ShareCommentAppPage } from './app.po';

describe('share-comment-app App', function() {
  let page: ShareCommentAppPage;

  beforeEach(() => {
    page = new ShareCommentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
