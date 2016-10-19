import {module} from "angular";

import catalog from "./catalog.component";

module('catalog', [
  'core',
  'zoomImg'
])
  .component('catalog', catalog);