page.$inject = [];

export function page() {
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