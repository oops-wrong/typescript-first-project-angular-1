import Page from './page.service';

type stringRetrieve = () => string;

export default class PageController {
  static $inject = ['page'];

  constructor (private page: Page) {}

  get getTitle(): stringRetrieve {
    return this.page.getTitle;
  }
}