export default class Page {
  static $inject = [];

  private title = '';

  constructor () {}

  /**
   * Get title text.
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Set title.
   */
  setTitle(newVal: string): void {
    this.title = newVal;
  }
}