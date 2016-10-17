export default class Product {
  static $inject = ['$resource'];

  private products: any[] = [];

  constructor (private $resource) {}

  /**
   * Cache products list.
   * @param {Array} newProducts
   */
  addProducts(newProducts: any[]) {
    this.products = newProducts;
  }

  /**
   * Get result of $resource.query() and remember result to product list if no productId getting.
   * @returns {*|{isArray, method, params}|{method, isArray}}
   */
  getQuery(productId: string) {
    var resource;
    var query;

    if (productId) {
      resource = this.getResourceOfDetails();
      query = resource.get({productId: productId});
    } else {
      resource = this.getResource();
      query = resource.query();
      query.$promise.then(this.addProducts.bind(this));
    }

    return query;
  }

  /**
   * Get list of cached products;
   * @returns {Array}
   */
  getProducts() {
    return this.products;
  }

  /**
   * Get cached product.
   * @param id
   * @returns {Object}
   */
  getProduct(id) {
    var product = null;

    this.products.some(function (elem) {
      if (elem.id === id) {
        product = elem;

        return true;
      }
    });

    return product;
  }

  /**
   * Get instance of $resource service with products list data.
   * @returns {Object}
   */
  getResource() {
    return this.$resource('assets/phones/phones.json', {}, {
      query: {
        isArray: true,
        method: 'GET'
      }
    });
  }

  /**
   * Get instance of $resource service with a product data.
   * @returns {Object}
   */
  getResourceOfDetails() {
    return this.$resource('assets/phones/:productId.json', {}, {
      query: {
        isArray: true,
        method: 'GET'
      }
    });
  }
}