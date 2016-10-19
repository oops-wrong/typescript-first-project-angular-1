import Page from '../core/page/page.service';
import {ProductId} from '../core/product/product.service';

class ProductController {
  static $inject = ['page', '$stateParams'];

  productId: ProductId;

  constructor (private page: Page, private $stateParams: angular.ui.IStateParamsService) {
    page.setTitle('Page of product');

    this.productId = this.$stateParams['productId'];
  }
}

let product: ng.IComponentOptions;

export default product = {
  templateUrl: require('file?name=[path][name].[hash].[ext]!./product.template.html'),
  controller: ProductController,
  controllerAs: 'vm',
  bindings: {
    productDetails: '<'
  }
};
