import {IProductDetails, Product} from './core/product/product.service';

/////////////////////////////////////////////////////////////
// CONFIG
/////////////////////////////////////////////////////////////

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export function config(
  $locationProvider: angular.ILocationProvider,
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider
): void {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/');

  let states = [
    {
      name: 'catalog',
      resolve: {
        products: productsPrep
      },
      template: '<catalog products="$resolve.products"></catalog>',
      url: '/'
    },
    {
      name: 'catalogAlias',
      redirectTo: 'catalog',
      url: '/catalog'
    },
    {
      isDialog: true,
      name: 'product',
      onEnter: openModal,
      parent: 'catalog',
      resolve: {
        productDetails: productDetailsPrep
      },
      url: 'catalog/{productId}'
    },
    {
      name: 'checkout',
      template: '<checkout></checkout>',
      url: '/checkout'
    }
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}

openModal.$inject = ['$rootScope', '$state', 'ngDialog', 'productDetails'];

/**
 * Open modal.
 */
function openModal(
  $rootScope: angular.IRootScopeService,
  $state: angular.ui.IStateService,
  ngDialog: angular.dialog.IDialogService,
  productDetails: IProductDetails
) {
  let newScope: angular.IScope = $rootScope.$new(true);

  newScope['productDetails'] = productDetails;

  let closePromise: angular.IPromise<angular.dialog.IDialogClosePromise> = ngDialog.open({
    plain: true,
    scope: newScope as angular.dialog.IDialogScope,
    template: '<product product-details="productDetails"></product>'
  }).closePromise;

  closePromise.finally(function() {
    $state.go('^');
  });
}

productsPrep.$inject = ['product'];

/**
 * Get resource promise with products list.
 */
function productsPrep(product: Product) {
  return product.getQuery().$promise;
}

productDetailsPrep.$inject = ['$stateParams', 'product'];

function productDetailsPrep($stateParams: angular.ui.IStateParamsService, product: Product) {
  return product.getQuery($stateParams['productId']).$promise;
}

/////////////////////////////////////////////////////////////
// RUN
/////////////////////////////////////////////////////////////

run.$inject = ['$rootScope', '$state', 'ngDialog'];

export function run(
  $rootScope: angular.IRootScopeService,
  $state: angular.ui.IStateService,
  ngDialog: angular.dialog.IDialogService
): void {
  $rootScope.$on('$stateChangeError', console.error.bind(console));

  $rootScope.$on('$stateChangeStart', (
    evt: angular.IAngularEvent,
    to: angular.ui.IState,
    params: angular.ui.IStateOptions
  ) => {

    // Define "redirectTo" field for state objects
    if (to['redirectTo']) {
      evt.preventDefault();
      $state.go(to['redirectTo'], params, {location: 'replace'})
    }

    // Close all dialogs if no-dialog state
    if (!to['isDialog']) {
      ngDialog.closeAll();
    }
  });
}