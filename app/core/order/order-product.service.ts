import * as ng from 'angular';

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
    let amount = 0;
    let list = this.order.getList();
    let productItem;

    list.forEach((elem) => {
      productItem = this.product.getProduct(elem.id);

      if (ng.isObject(this.product) && ng.isNumber(productItem.cost)) {
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