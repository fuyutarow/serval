import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import store from './Store';
import Serval from './serval/Root';

ReactDOM.render(
  <Provider store={ store }>
    <Serval />
  </Provider>
  , document.getElementById('app')
);
