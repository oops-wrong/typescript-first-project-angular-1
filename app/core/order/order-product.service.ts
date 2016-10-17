import * as angular from 'angular';

import Order from './order.service';
import Product from '../product/product.service';
import Utils from '../utils/utils.service';

export default class OrderProduct {
  static $inject = ['order', 'product', 'utils'];

  constructor (private order: Order, private product: Product, private utils: Utils) {}

  /**
   * Get amount of basket.
   */
  getAmount(): number {
    var amount = 0;
    var list = this.order.getList();
    var productItem;

    list.forEach((elem) => {
      productItem = this.product.getProduct(elem.id);

      if (angular.isObject(this.product) && angular.isNumber(productItem.cost)) {
        amount += productItem.cost * elem.count;
      }
    });

    return amount;
  }

  /**
   * Get count word with declination.
   */
  getDeclCountText(count: number): string {
    return this.utils.declOfNum(count, ['позиция', 'позиции', 'позиций']);
  }

  /**
   * Get length of order list.
   */
  getListLength(): number {
    return this.order.getList().length;
  }
}