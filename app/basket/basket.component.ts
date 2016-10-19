import OrderProduct from '../core/order/order-product.service';

class BasketController {
  static $inject = ['$rootScope', 'orderProduct'];

  amount = 0;
  count = 0;
  countText = '';

  constructor (private $rootScope: angular.IRootScopeService, private orderProduct: OrderProduct) {
    this.$rootScope.$on('order.change', this.orderChanged.bind(this));
  }

  /**
   * Order changed event handler.
   */
  orderChanged(): void {
    this.amount = this.orderProduct.getAmount();
    this.count = this.orderProduct.getListLength();
    this.countText = this.orderProduct.getDeclCountText(this.count);
  }
}

let basket: angular.IComponentOptions;

export default basket = {
  templateUrl: require('file?name=[path][name].[hash].[ext]!./basket.template.html'),
  controller: BasketController,
  controllerAs: 'vm'
};
