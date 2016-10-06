import {module} from 'angular';

import {order} from './order/order.service';
import {orderProduct} from './order/order-product.service';
import {PageController} from './page/page.controller';
import {page} from './page/page.service';
import {productFactory} from './product/product.service';
import {utils} from './utils/utils.service';

module('core', [
  'ngResource'
])
  .factory('order', order)
  .factory('orderProduct', orderProduct)
  .controller('PageController', PageController)
  .factory('page', page)
  .factory('product', productFactory)
  .factory('utils', utils);