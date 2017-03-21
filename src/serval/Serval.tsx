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
        <button ref="btn">{ this.props.state.phase }</button>
        <p>{ this.props.state.text }</p>
        <p>
          <button ref="speakbtn">Speak</button>
          <input type="text" ref="text"/>
        </p>

        <audio ref="sugoi" src="./audio/nc154074.wav" type="audio/wav" />
      </div>
    );
  }

  componentDidMount() {

    const btn = ReactDOM.findDOMNode(this.refs.btn) as HTMLInputElement;

    speech.addEventListener('result', e => {
      console.log((e as SpeechRecognitionEvent).results)
      const text = (e as SpeechRecognitionEvent).results[(e as SpeechRecognitionEvent).results.length-1][0].transcript
      this.props.actions.listen(text);
    }, false);
    speech.start();

    btn.addEventListener('click', () => {
      if( this.props.state.phase=="waiting" ){
        speech.start();
      }
      if( this.props.state.phase=="listening" ){
        speech.stop();
      }
      this.props.actions.click()
    }, false);

    const speakbtn = ReactDOM.findDOMNode(this.refs.speakbtn) as HTMLInputElement;
    speakbtn.addEventListener('click', () => {
      const synthes = new SpeechSynthesisUtterance();
      //synthes.voiceURI = 1;            // 出力する音声の種類
      synthes.volume = 1;              // 出力する音声のボリューム
      synthes.rate = 1;                // 出力する音声の速さ
      synthes.pitch = 2;               // 出力する音声のピッチ(高さ)
      synthes.text = (ReactDOM.findDOMNode(this.refs.text) as HTMLInputElement).value;     // 出力する文章
      synthes.lang = 'ja-JP';          // 出力する音声の言語
      speechSynthesis.speak( synthes );
    }, false);
  }

  componentDidUpdate() {
    const sugoi = ReactDOM.findDOMNode(this.refs.sugoi) as HTMLAudioElement;
    if( this.props.state.text=="すごい" ){
      setTimeout( () => {
        sugoi.play();
        this.props.actions.listen("");
        }, 200);
      }
  }
}
