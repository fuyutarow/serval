import * as Immutable from 'immutable';
import * as ObjectAssign from 'object-assign';

export interface servalState {
  phase: string;
  text: string;
}

interface servalAction {
  type: string;
  text?: string;
}

export class ActionTypes {
  static CLICK = 'duckshogi/click';
  static LISTEN = 'duckshogi/listen';
}

const INITIAL_STATE =  {
  phase: "waiting",
  text: "",
};

export default function reducer(
  state: servalState = INITIAL_STATE,
  action: servalAction
): servalState {

  switch (action.type) {
    case ActionTypes.CLICK: switch( state.phase ){
      case "waiting":
        return ObjectAssign( {}, state, { phase: "listening" } );

      case "listening":
        return ObjectAssign( {}, state, { phase: "waiting" } );
    }

    case ActionTypes.LISTEN:
      return ObjectAssign( {}, state, { text: action.text } );

    default:
      return state;
  }
}

export class ActionDispatcher {
  dispatch: (action: any) => any;
  constructor(dispatch: (action: any) => any) {
    this.dispatch = dispatch
  }
  click(){
    this.dispatch({ type: ActionTypes.CLICK });
  }
  listen( text:string ){
    this.dispatch({ type: ActionTypes.LISTEN, text:text });
  }
}
