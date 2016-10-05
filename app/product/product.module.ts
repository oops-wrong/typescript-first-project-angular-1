import {module} from 'angular';

import {productComponent} from './product.component';

module('product', [
  'core.page',
  'ui.router'
])
  .component('product', productComponent);