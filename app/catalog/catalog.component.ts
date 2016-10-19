import * as angular from 'angular';

import Order from '../core/order/order.service';
import Page from '../core/page/page.service';
import {ProductId} from '../core/product/product.service';

class CatalogController implements angular.IComponentController {
  static $inject = ['order', 'page'];

  constructor (private order: Order, private page: Page) {
    this.page.setTitle('Catalog of products');
  }

  /**
   * Add to cart product item handler.
   */
  addToCart(id: ProductId): void {
    let newItem = Order.createOrderItem({id: id});

    this.order.addToList(newItem);
  }

  /**
   * Check product for the presence in order list.
   */
  isAdded(id: ProductId): boolean {
    return angular.isObject(this.order.getItemById(id));
  }

  /**
   * Remove from cart product item handler.
   */
  removeFromCart(productId: ProductId): void {
    this.order.removeFromList(productId);
  }
}

let catalog: angular.IComponentOptions;

export default catalog = {
  templateUrl: require('file?name=[path][name].[hash].[ext]!./catalog.template.html'),
  controller: CatalogController,
  controllerAs: 'vm',
  bindings: {
    products: '<'
  }
};
