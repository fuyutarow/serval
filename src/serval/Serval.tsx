import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { servalState, ActionDispatcher } from './module';
import * as Immutable from 'immutable';

const speech = new webkitSpeechRecognition();
speech.lang = 'ja';
speech.continuous = true;

interface Props {
  state: servalState;
  actions: ActionDispatcher;
}

export class Serval extends React.Component<Props, {}> {
  render() {

    return (
      <div>
        <p>{ this.props.state.text }</p>
        <p>
          <button ref="speakbtn">Speak</button>
          <input type="text" ref="text"/>
        </p>
        <audio ref="sugoi" src="audio/nc154074.wav" type="audio/wav" />
      </div>
    );
  }

  componentDidMount() {
    speech.start();
    speech.onresult = event => {
      const e = event as SpeechRecognitionEvent;
      const audio_sugoi = ReactDOM.findDOMNode(this.refs.sugoi) as HTMLAudioElement;
      for( let i = e.resultIndex; i < e.results.length; ++i ){
        console.log(e.results[i][0].transcript)
        this.props.actions.listen(e.results[i][0].transcript);
      }
    }


    const speakbtn = ReactDOM.findDOMNode(this.refs.speakbtn) as HTMLInputElement;
    speakbtn.addEventListener('click', () => {
      const synthes = new SpeechSynthesisUtterance();
      //synthes.voiceURI = 1;
      synthes.volume = 1;// 0 - 1
      synthes.rate = 1;// 0 - 10
      synthes.pitch = 2;// 0 - 2
      synthes.text = (ReactDOM.findDOMNode(this.refs.text) as HTMLInputElement).value;
      synthes.lang = 'ja-JP';
      speechSynthesis.speak( synthes );
    }, false);
  }

  componentDidUpdate() {
    const audio_sugoi = ReactDOM.findDOMNode(this.refs.sugoi) as HTMLAudioElement;
    const text  = this.props.state.text
    if( this.props.state.text=="すごい" ){
      console.log()
      setTimeout( () => { audio_sugoi.play();}, 200);
      }
  }

}
