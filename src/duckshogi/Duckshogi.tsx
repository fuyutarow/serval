import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { State, ActionDispatcher } from './module';
import * as Immutable from 'immutable';
const speech = new webkitSpeechRecognition();
speech.lang = 'ja';
speech.continuous = true;


interface Props {
  state: State;
  actions: ActionDispatcher;
}

export class Duckshogi extends React.Component<Props, {}> {

  render() {
    return (
      <div>
        <button ref="btn">{ this.props.state.phase }</button>
        <p>{ this.props.state.text }</p>
      </div>
    );
  }

  componentDidMount() {
    const btn = ReactDOM.findDOMNode(this.refs.btn) as HTMLInputElement;

    speech.addEventListener('result', e => {
      console.log((e as SpeechRecognitionEvent).results)
      const text = (e as SpeechRecognitionEvent).results[0][0].transcript
      this.props.actions.listen(text);
    }, false);

    btn.addEventListener('click', () => {
      if( this.props.state.phase=="waiting" ){
        speech.start();
      }
      if( this.props.state.phase=="listening" ){
        speech.stop();
      }
      this.props.actions.click()
    }, false);

  }

  componentDidUpdate() {
  }
}
