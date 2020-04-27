/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 1/21/15.
 */

var CAMERA_HOST = '192.168.0.199',
	USERNAME = 'admin',
	PASSWORD = '',
	PORT = 80;

var http = require('http'),
	Cam = require('./lib/onvif').Cam;


new Cam({
	hostname: CAMERA_HOST,
	username: USERNAME,
	password: PASSWORD,
	port: PORT
}, function(err) {
	if (err) {
		console.log('Connection Failed for ' + CAMERA_HOST + ' Port: ' + PORT + ' Username: ' + USERNAME + ' Password: ' + PASSWORD);
		return;
	}
	console.log('CONNECTED');
	this.absoluteMove({
		x: 1
		, y: 1
		, zoom: 1
	});
	this.getStreamUri({protocol: 'RTSP'}, function(err, stream) {
		http.createServer(function(req, res) {
			console.log(stream.uri);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('<!DOCTYPE html>' +
			'<html>' +
			'	<head>' +
			'		<meta charset="utf-8">' +
			'		<title></title>' +
			'	</head>' +
			'	<body>' +
			'		<video src="http://localhost:8111/live" style="width: 960; height: 640;">' +
			'		</video>' +
			'	</body>' +
			'</html>');
		}).listen(3030);
	});
});