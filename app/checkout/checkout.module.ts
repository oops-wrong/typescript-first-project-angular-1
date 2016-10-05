import {module} from 'angular';

import {checkoutComponent} from './checkout.component';

module('checkout', [
  'core.order',
  'core.page',
  'core.product'
])
  .component('checkout', checkoutComponent);