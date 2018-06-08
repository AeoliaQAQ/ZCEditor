import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ZCEditor from '@/ZCEditor/ZCEditor';

class App extends Component {
  constructor(props){
    super(props);
    this.focus = () => this.refs.editor.focus();
  }

  //清除
  _onClearClick=(e)=>{
    this.refs.zcEditor._onClearClick(e);
  }
  render() {
    return (
      <div className="App">
        <ZCEditor ref="zcEditor"/>
      </div>
    );
  }
}
export default App;
