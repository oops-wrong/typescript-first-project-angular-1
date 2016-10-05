PageController.$inject = ['page'];

export function PageController(page) {
  var vm = this;

  vm.getTitle = page.getTitle;
}