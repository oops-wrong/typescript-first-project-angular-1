import {module} from 'angular';

import Order from './order/order.service';
import OrderProduct from './order/order-product.service';
import PageController from './page/page.controller';
import Page from './page/page.service';
import Product from './product/product.service';
import Utils from './utils/utils.service';

module('core', [
  'ngResource'
])
  .service('order', Order)
  .service('orderProduct', OrderProduct)
  .controller('PageController', PageController)
  .service('page', Page)
  .service('product', Product)
  .service('utils', Utils);
