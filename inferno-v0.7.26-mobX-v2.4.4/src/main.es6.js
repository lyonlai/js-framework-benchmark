'use strict';

import Inferno from "inferno";
import InfernoDOM from 'inferno-dom'
import {Controller} from './controller';
import {Store} from './store';

let store = new Store();

InfernoDOM.render(<Controller store={store}/>,  document.getElementById("main"));
