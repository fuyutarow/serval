import { createStore, combineReducers } from 'redux';
import serval from './serval/module';

export default createStore(
  combineReducers({
    serval:serval
  })
);
