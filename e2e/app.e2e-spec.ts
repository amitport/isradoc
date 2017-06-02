import { IsradocPage } from './app.po';

describe('isradoc App', () => {
  let page: IsradocPage;

  beforeEach(() => {
    page = new IsradocPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to id!!'))
      .then(done, done.fail);
  });
});
