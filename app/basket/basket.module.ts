import {module} from "angular";

import {basketComponent} from './basket.component';

module('basket', [
  'core'
])
  .component('basket', basketComponent);