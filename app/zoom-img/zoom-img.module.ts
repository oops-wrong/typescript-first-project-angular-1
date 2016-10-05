import {module} from 'angular';

import {zoomImg as zoomImgDirective} from './zoom-img.directive';

module('zoomImg', [])
  .directive('zoomImg', zoomImgDirective);