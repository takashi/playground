import ReactDOM from "react-dom"
import React from 'react'
import {dispatcher, subscriber} from 'react-dispatcher-decorator';

@dispatcher
class Child extends React.Component {
  render() {
    return <button onClick={() => this.context.dispatch('increment', 1) }>increment</button>
  }
}

@subscriber((self, subscribe) => {
  subscribe('increment', (prop) => {
    self.setState({count: self.state.count + prop})
  })
})
class App extends React.Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        {this.state.count}
        <Child/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#main'));
