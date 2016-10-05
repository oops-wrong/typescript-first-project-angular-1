import {module} from "angular";

import {catalogComponent} from "./catalog.component";

module('catalog', [
  'core.order',
  'core.page',
  'zoomImg'
])
  .component('catalog', catalogComponent);