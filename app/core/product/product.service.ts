export type ProductId = string;

export interface IProduct extends angular.resource.IResource<IProduct> {
  age: number;
  cost: number;
  id: ProductId;
  imageUrl: string;
  name: string;
  snippet: string;
}

export interface IProductDetails extends angular.resource.IResource<IProductDetails> {
  additionalFeatures: string;
  android: {
    os: string;
    ui: string;
  };
  availability: string[];
  battery: string;
  camera: {
    features: string[];
    primary: string;
  };
  connectivity: {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
  };
  description: string;
  display: {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
  };
  hardware: {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
  };
  id: ProductId;
  images: string[];
  name: string;
  sizeAndWeight: {
    screenResolution: string[];
    screenSize: string;
  };
  storage: {
    flash: string;
    ram: string;
  };
}

export default class Product {
  static $inject = ['$resource'];

  private products: IProduct[] = [];

  constructor (private $resource: angular.resource.IResourceService) {}

  /**
   * Cache products list.
   */
  addProducts(newProducts: IProduct[]): void {
    this.products = newProducts;
  }

  /**
   * Get result of $resource.query() and remember result to product list if no productId getting.
   */
  getQuery(productId: ProductId): angular.resource.IResourceMethod<IProductDetails>;
  getQuery(productId: void): angular.resource.IResourceMethod<IProduct[]>;
  getQuery(productId: any): angular.resource.IResourceMethod<any> {
    let resource;
    let query;

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
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Get cached product.
   */
  getProduct(id: ProductId): IProduct {
    let product = null;

    this.products.some((elem) => {
      if (elem.id === id) {
        product = elem;

        return true;
      }
    });

    return product;
  }

  /**
   * Get instance of $resource service with products list data.
   */
  getResource(): angular.resource.IResourceClass<angular.resource.IResource<IProduct[]>> {
    return this.$resource('assets/phones/phones.json', {}, {
      query: {
        isArray: true,
        method: 'GET'
      }
    });
  }

  /**
   * Get instance of $resource service with a product data.
   */
  getResourceOfDetails(): angular.resource.IResourceClass<angular.resource.IResource<IProductDetails>> {
    return this.$resource('assets/phones/:productId.json', {}, {
      query: {
        isArray: true,
        method: 'GET'
      }
    });
  }
}