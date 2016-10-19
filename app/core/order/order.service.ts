import * as ng from 'angular';

import {ProductId} from '../product/product.service';

export interface IOrderItem {
  count?: number;
  id: ProductId;
}

export default class Order {
  static $inject = ['$rootScope'];

  private list: IOrderItem[] = [];

  constructor (private $rootScope: angular.IRootScopeService) {}

  /**
   * Add to cart list an order item.
   */
  addToList(item: IOrderItem): boolean {
    if (ng.isObject(item) && item.id) {
      this.list.push(item);

      this.$rootScope.$emit('order.add', {
        id: item.id
      });
      this.$rootScope.$emit('order.change');

      return true;
    }

    return false;
  }

  /**
   * Create new order item is not placed on the list.
   */
  static createOrderItem(data: {id: ProductId}): IOrderItem {
    let defaultOptions = {
      count: 1
    };
    let newItem: IOrderItem = {} as IOrderItem;

    if (!ng.isObject(data) || !data.id) {
      return null;
    }

    ng.extend(newItem, defaultOptions, data);

    return newItem;
  }

  /**
   * Get order item by product id.
   */
  getItemById(id: ProductId): IOrderItem {
    let item: IOrderItem = null;

    this.list.some(function (elem) {
      if (!ng.isObject(elem)) {
        return true;
      }

      if (elem.id === id) {
        item = elem;

        return true;
      }
    });

    return item;
  }

  /**
   * Get list of order items.
   */
  getList(): IOrderItem[] {
    return this.list;
  }

  /**
   * Remove a product from order list.
   */
  removeFromList(id: ProductId): boolean {
    let result = false;
    let item: IOrderItem = this.getItemById(id);
    let index: number;

    if (ng.isObject(item)) {
      index = this.list.indexOf(item);

      if (~index) {
        this.list.splice(index, 1);
        result = true;

        this.$rootScope.$emit('order.remove', {
          id: id
        });
        this.$rootScope.$emit('order.change');
      }
    }

    return result;
  }

  /**
   * Update data in order item.
   */
  updateOrderItem(data: IOrderItem): boolean {
    let result = false;
    let id: ProductId;
    let item: IOrderItem;

    if (ng.isObject(data) && data.id) {
      id = data.id;
      item = this.getItemById(id);

      if (ng.isObject(item)) {
        ng.merge(item, data);
        result = true;

        this.$rootScope.$emit('order.update', data);
        this.$rootScope.$emit('order.change');
      }
    }

    return result;
  }
}

export {Order};
