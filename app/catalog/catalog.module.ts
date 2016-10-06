import {module} from "angular";

import {catalogComponent} from "./catalog.component";

module('catalog', [
  'core',
  'zoomImg'
])
  .component('catalog', catalogComponent);