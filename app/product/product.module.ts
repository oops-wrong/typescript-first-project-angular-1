import {module} from 'angular';

import Product from './product.component';

module('product', [
  'core',
  'ui.router'
])
  .component('product', Product);