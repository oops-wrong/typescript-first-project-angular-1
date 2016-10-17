export default class Utils {
  static $inject = [];

  constructor () {}

  /**
   * Get declined russian word.
   */
  declOfNum(number: number, titles: string[]): string {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]];
  }
}