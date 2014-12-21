// magic comment is not needed with "jsx" extension and reactify.
var React = require('react');

// create super simple class

// nested property can be gotten by this.props.children
var HelloWorld = React.createClass({
  propTypes: {
    // this means childlen must be a React component.
    children: React.PropTypes.component.isRequired
  },
  render: function() {
    return (
      <div className="hello-world">
        <h1>Hello, { this.props.name }!</h1>
        <p>{this.props.children}</p>
      </div>
    );
  }
})

var Profile = React.createClass({
  // > State should contain data that a component's event handlers may change to trigger a UI update.
  getInitialState: function() {
    return {
      birth: '3/3/1993'
    };
  },
  handleInput: function(e) {
    this.setState({birth: e.target.value})
  },
  render: function() {
    return (
      <ul>
        <li>job: engineer</li>
        <li>birth: {this.state.birth}</li>
        type your birthday: <input type="text" onChange={this.handleInput} value={this.state.birth} />
      </ul>
    )
  }
})

React.renderComponent(
  <HelloWorld name="John Doe"><Profile /></HelloWorld>,
  document.getElementById('example')
);
