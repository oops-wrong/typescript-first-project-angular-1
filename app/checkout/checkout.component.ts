import * as ng from 'angular';

import {IOrderItem, Order} from '../core/order/order.service';
import OrderProduct from '../core/order/order-product.service';
import Page from '../core/page/page.service';
import {IProduct, Product, ProductId} from '../core/product/product.service';

interface ICheckoutItem extends IProduct {
  orderInfo: IOrderItem;
}

class CheckoutController {
  static readonly MAX_COUNT = 99;
  static readonly MIN_COUNT = 1;

  static $inject = ['$rootScope', 'order', 'orderProduct', 'page', 'product'];

  amount = 0;
  items: ICheckoutItem[] = [];

  constructor (
    private $rootScope: angular.IRootScopeService,
    private order: Order,
    private orderProduct: OrderProduct,
    private page: Page,
    private product: Product
  ) {
    page.setTitle('Checkout');
    this.generateItemsList();
    this.orderChanged();

    $rootScope.$on('order.add', this.orderListChanged.bind(this));
    $rootScope.$on('order.remove', this.orderListChanged.bind(this));
    $rootScope.$on('order.change', this.orderChanged.bind(this));
  }

  /**
   * Add value to count input.
   */
  addCount($event: JQueryMouseEventObject, value: number): void {
    let $btn = $($event.target);
    let $container = $btn.closest('.count-group');
    let $input = $container.find('.input-number');
    let inputVal: number = parseInt($input.val());
    let count: number;

    inputVal += value;
    count = CheckoutController.normalizeCountValue(inputVal);

    $input.val(count);
    $input.trigger('change');
  }

  /**
   * Change input handler.
   */
  changeInput(orderInfo: IOrderItem): void {
    let count = CheckoutController.normalizeCountValue(orderInfo.count);
    orderInfo.count = count;

    let id = orderInfo.id;
    let orderItem: IOrderItem = {
      count: count,
      id: id
    };

    this.order.updateOrderItem(orderItem);
  }

  /**
   * Generate list of checkout items combining product and order items.
   */
  generateItemsList(): void {
    let orderList = this.order.getList();
    let productItem: IProduct;
    this.items = [];

    orderList.forEach((orderItem: IOrderItem) => {
      let checkoutItem: ICheckoutItem;
      productItem = this.product.getProduct(orderItem.id);

      if (ng.isObject(productItem)) {
        checkoutItem = ng.copy(productItem) as ICheckoutItem;
        checkoutItem.orderInfo = orderItem;
        this.items.push(checkoutItem);
      }
    });
  }

  /**
   * Get normal normalized of count input
   */
  static normalizeCountValue(value: number | string): number {
    let normalized: number = parseInt(value as string) || this.MIN_COUNT;

    switch (true) {
      case normalized < this.MIN_COUNT:
        return this.MIN_COUNT;

      case normalized > this.MAX_COUNT:
        return this.MAX_COUNT;
    }

    return normalized;
  }

  /**
   * Order changed event handler.
   */
  orderChanged(): void {
    this.amount = this.orderProduct.getAmount();
  }

  /**
   * Order list changed (add or remove) event handler.
   */
  orderListChanged(): void {
    this.generateItemsList();
  }

  /**
   * Remove item from order.
   */
  removeItem(id: ProductId): void {
    this.order.removeFromList(id);
  }
}

let checkout: ng.IComponentOptions;

export default checkout = {
  templateUrl: require('file?name=[path][name].[hash].[ext]!./checkout.template.html'),
  controller: CheckoutController,
  controllerAs: 'vm'
};
