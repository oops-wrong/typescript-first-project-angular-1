import {core} from '../core.module';

core.controller('PageController', PageController);

PageController.$inject = ['page'];

function PageController(page) {
  var vm = this;

  vm.getTitle = page.getTitle;
}