// Generated by CoffeeScript 1.6.3
var app, express, flash, http, path, routes;

express = require('express');

routes = require('./routes');

http = require('http');

path = require('path');

app = express();


app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.use(express.favicon());

app.use(express.logger('dev'));

app.use(express.bodyParser());

app.use(express.methodOverride());

app.use(express.cookieParser('keyboard cat'));

app.use(express.session({
	cookie: {
		maxAge: 600000000
	}
}));

app.use(app.router);
app.use(express["static"](path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

require('./routes').route(app);

var a = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

