import {module} from 'angular';

import {config, run} from './app.routes';
import './basket/basket.module';
import './catalog/catalog.module';
import './checkout/checkout.module';
import './core/core.module';
import './product/product.module';
import './zoom-img/zoom-img.module';

module('testShopApp', [
  'basket',
  'catalog',
  'checkout',
  'core',
  'ngAnimate',
  'ngDialog',
  'ngResource',
  'product',
  'ui.router',
  'zoomImg'
])
  .config(config)
  .run(run);
