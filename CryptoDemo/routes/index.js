
/*
 * GET home page.
 */
var dfs = dfs || {};
dfs.route = dfs.route || {};
dfs.require = dfs.require || {};
WEP = require('./WEP.js');

exports.route = function(app){
	app.get('/', dfs.route.get_home);
	app.get('/setup', dfs.route.setup);
	app.post('/setup', dfs.route.post_setup_info);
	app.get('/auth', dfs.route.auth);
	app.post('/auth', dfs.route.post_auth);
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
	res.render('auth', {title: 'Authentication', key: req.session.key});
}

dfs.route.post_auth = function(req,res){

	var wep = new WEP(req.session.key,"",req.body['cipher']);
	wep.decryption(function(message){
		if (message == 'error') {
			return res.send({err:'Integrity test failed. Somebody hijacked your message'})
		};
		console.log(message);
		console.log(req.session.password);
		if(message != req.session.password){
			return res.send({err:'Wrong password'});
		};
		return res.send({succ:'Authentication succeeded'});
	});
}

