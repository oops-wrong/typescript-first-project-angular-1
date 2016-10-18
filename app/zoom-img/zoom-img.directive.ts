export let zoomImg: Function & angular.IDirectiveFactory;

export default zoomImg = function(): angular.IDirective {
  return {
    link: link,
    restrict: 'A',
    scope: {}
  };

  function link(scope: angular.IScope, element: JQuery) {
    $(() => {
      if (typeof $.zoom === 'function') {
        let $images = element.find('img');

        $images.each((i: number) => {
          let $image = $images.eq(i);

          $image.parent().zoom({
            on: 'grab'
          });
        });
      } else {
        console.error('Plugin "jQuery-Zoom" does not included.');
      }
    });
  }
};

zoomImg.$inject = [];
