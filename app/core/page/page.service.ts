import {core} from '../core.module';

core.factory('page', page);

page.$inject = [];

function page() {
  var title = '';

  return {
    getTitle: getTitle,
    setTitle: setTitle
  };

  ////////////////

  /**
   * Get title text.
   * @returns {string}
   */
  function getTitle() {
    return title;
  }

  /**
   * Set title.
   * @param newVal
   */
  function setTitle(newVal) {
    title = newVal;
  }
}