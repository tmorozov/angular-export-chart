
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , exporting = require('./routes/exporting')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals.pretty = true;

app.get('/', routes.index);
app.post('/render/pdf', exporting.renderPdf);
app.post('/export/pdf', exporting.exportPdf);

app.post('/render/png', exporting.renderPng);
app.post('/export/png', exporting.exportPng);

app.post('/export/xls', exporting.exportXls);
app.post('/export/csv', exporting.exportCsv);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
