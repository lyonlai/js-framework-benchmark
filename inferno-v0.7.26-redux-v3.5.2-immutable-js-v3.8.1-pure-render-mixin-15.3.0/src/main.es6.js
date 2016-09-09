'use strict';

import Inferno from "inferno";
import Controller from './controller';

import InfernoDOM from 'inferno-dom';
import store from './store';
import {Provider} from 'inferno-redux';

InfernoDOM.render(
  (
    <Provider store={store}>
      <Controller />
    </Provider>
  ),
  document.getElementById("main")
);
