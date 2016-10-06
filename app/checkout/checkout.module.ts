import {module} from 'angular';

import {checkoutComponent} from './checkout.component';

module('checkout', [
  'core',
])
  .component('checkout', checkoutComponent);