var React = require('react');
var Hello = require('./components/hello');

var hello = React.render(
  <Hello name="John"/>,
  document.getElementById('app')
)
// why?
// http://qiita.com/koba04/items/a62a30c6934466ea8dea#%E5%8E%9F%E5%89%87rendertostring%E3%81%AE%E5%A0%B4%E5%90%88
// http://qiita.com/mizchi/items/dca6b82349e811a24158
hello.setProps({name: 'hoge'});
