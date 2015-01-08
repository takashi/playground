var express      = require('express');
var path         = require('path');
var fs           = require('fs');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var plates       = require('plates')
var React        = require('React');
var Hello        = React.createFactory(require('./app/components/hello'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());


// PAGES

app.get('/', function(req, res) {
  var html = React.renderToString(Hello({name: 'John'}));
  render(res, html, {});
});

console.log('server listening port 4000');
app.use(express.static(path.join(__dirname, 'public')))
app.listen(4000);

module.exports = app;

function render(res, appHtml, appData) {
    fs.readFile(
        path.join(__dirname, 'public', 'index.html'),
        { encoding: 'utf-8'},
        function(err, tmpl) {
            var html = plates.bind(tmpl, {
                app: appHtml,
                appData: 'APP_DATA = ' + JSON.stringify(appData)
            });

            res.set('Content-Type', 'text/html');
            res.send(html);
        }
    );
}
