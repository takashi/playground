import React, { Component } from 'react'
import Codemirror from 'react-codemirror';

require('./node_modules/codemirror/mode/javascript/javascript');

let App;
let jsrepl = new JSREPL();

jsrepl.on('ready', () => {
  console.log('ready')
})

jsrepl.loadLanguage('javascript', function () {
  jsrepl.on('result', (data) => {
    console.log(data)
  })
  jsrepl.on('error', (data) => {
    console.log(data)
  })
});

App = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: "// Start writing code here"
    }
  }
  onUpdateCode(code) {
    this.setState({code: code})
  }
  evalCode() {
    console.log(jsrepl.eval(this.state.code))
  }
  render() {
      var options = {
          lineNumbers: true,
          theme: 'monokai',
          mode: 'javascript'
      };
      return (
        <div>
          <Codemirror value={this.state.code} onChange={this.onUpdateCode.bind(this)} options={options} />
          <button onClick={this.evalCode.bind(this)}></button>
        </div>
      )
  }
}

export default App;
