import {module} from 'angular';

import checkout from './checkout.component';

module('checkout', [
  'core',
])
  .component('checkout', checkout);