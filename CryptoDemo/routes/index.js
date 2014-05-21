
/*
 * GET home page.
 */
var dfs = dfs || {};
dfs.route = dfs.route || {};
dfs.require = dfs.require || {};

exports.route = function(app){
	app.get('/', dfs.route.get_home);
	app.get('/setup', dfs.route.setup);
	app.post('/setup', dfs.route.post_setup_info);
	app.get('/auth', dfs.route.auth);
	
};

dfs.route.get_home = function(req, res){
	res.render('index', {title: 'Home'});
};

dfs.route.setup = function(req, res){
	res.render('setup', {title: 'setup'});
}

dfs.route.post_setup_info = function(req, res){
	req.session.key = req.body['key'];
	req.session.password = req.body['password'];
	res.redirect('/auth')
}

dfs.route.auth = function(req, res){
	res.render('auth', {title: 'Authentication'});
}

