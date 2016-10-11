zoomImg.$inject = [];

export function zoomImg() {
  return {
    link: link,
    restrict: 'A',
    scope: {}
  };

  function link(scope, element) {
    var $element = $(element);
    var $images;

    $(function () {
      if (typeof $.zoom === 'function') {
        $images = $element.find('img');

        $images.each(function () {
          var $image = $(this);

          $image.parent().zoom({
            on: 'grab'
          });
        });
      } else {
        console.error('Plugin "jQuery-Zoom" does not included.');
      }
    });
  }
}