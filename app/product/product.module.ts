import {module} from 'angular';

import {productComponent} from './product.component';

module('product', [
  'core',
  'ui.router'
])
  .component('product', productComponent);