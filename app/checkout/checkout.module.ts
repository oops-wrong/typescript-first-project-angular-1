import {module} from 'angular';

export let checkout = module('checkout', [
  'core.order',
  'core.page',
  'core.product'
]);