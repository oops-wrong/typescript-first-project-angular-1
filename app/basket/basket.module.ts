import {module} from "angular";

import basket from './basket.component';

module('basket', [
  'core'
])
  .component('basket', basket);