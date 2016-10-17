import * as angular from 'angular';

export default class Order {
  static $inject = ['$rootScope'];

  private list = [];

  constructor (private $rootScope) {}

  /**
   * Add to cart list an order item.
   * @param {Object} item
   * @returns {boolean}
   */
  addToList(item) {
    if (angular.isObject(item) && item.id) {
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
   * Create new order item.
   * @param {Object} data
   * @returns {Object} - {id: <string>, count: <number>}
   */
  createOrderItem(data) {
    var defaultOptions = {
      count: 1
    };
    var newItem = {};

    if (!angular.isObject(data) || !data.id) {
      return null;
    }

    angular.extend(newItem, defaultOptions, data);

    return newItem;
  }

  /**
   * Get order item by product id.
   * @param {string} id
   * @returns {Object}
   */
  getItemById(id) {
    var item = null;

    this.list.some(function (elem) {
      if (!angular.isObject(elem)) {
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
   * @returns {Array}
   */
  getList() {
    return this.list;
  }

  /**
   * Remove a product from order list.
   * @param {string} id - Product id
   */
  removeFromList(id) {
    var result = false;
    var item = this.getItemById(id);
    var index;

    // Remove item from list
    if (angular.isObject(item)) {
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
   * @param {Object} data
   * @returns {boolean}
   */
  updateOrderItem(data) {
    var result = false;
    var id;
    var item;

    if (angular.isObject(data) || !data.id) {
      id = data.id;
      item = this.getItemById(id);

      if (angular.isObject(item)) {
        angular.merge(item, data);

        this.$rootScope.$emit('order.update', data);
        this.$rootScope.$emit('order.change');
      }
    }

    return result;
  }
}