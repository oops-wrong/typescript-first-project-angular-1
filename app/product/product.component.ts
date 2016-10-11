export let productComponent = {
  templateUrl: require('file?name=[path][name].[hash].[ext]!./product.template.html'),
  controller: ProductController,
  controllerAs: 'vm',
  bindings: {
    productDetails: '<'
  }
};

ProductController.$inject = ['page', '$stateParams'];

function ProductController(page, $stateParams) {
  var vm = this;

  vm.productId = $stateParams.productId;

  activate();

  ////////////////

  function activate() {
    page.setTitle('Page of product');
  }
}