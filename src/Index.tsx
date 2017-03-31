import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import store from './Store';
import Serval from './serval/Root';

if( !('webkitSpeechRecognition' in window) ){
  <div>
    This is supported by only chrome version 25 or later.
  </div>
}else{
  ReactDOM.render(
    <Provider store={ store }>
      <Serval />
    </Provider>
    , document.getElementById('app')
  );
}
