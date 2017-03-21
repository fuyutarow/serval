import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Serval } from './serval';
import { ActionDispatcher } from './module';

export default connect(
  (store: any) => ({ state: store.serval }),
  (dispatch: Dispatch<any>) => ({actions: new ActionDispatcher(dispatch)})
)(Serval);
