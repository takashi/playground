var React = require('React')

var Hello = React.createClass({displayName: "Hello",
  render:function() {
    return (
      React.createElement("div", null, "Hello ", this.props.name)
    )
  }
});

module.exports = Hello;
