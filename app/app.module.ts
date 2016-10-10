import {module} from 'angular';
import 'angular-animate';
import 'angular-resource';
import 'angular-ui-router';
import 'jquery';
import 'jquery-zoom';
import 'ng-dialog';

import {config, run} from './app.routes';
import './basket/basket.module';
import './catalog/catalog.module';
import './checkout/checkout.module';
import './core/core.module';
import './product/product.module';
import './zoom-img/zoom-img.module';

import 'bootstrap/dist/css/bootstrap.css';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

import './assets/styles/app.scss';

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
