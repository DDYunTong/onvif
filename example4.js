/**
 * Discover ONVIF devices on the network
 *
 * Created by Roger Hardiman <opensource@rjh.org.uk>
 *
 */

var onvif = require('./lib/onvif');

// eslint-disable-next-line no-unused-vars
onvif.Discovery.on('device', function(cam,rinfo,xml){
	// function will be called as soon as NVT responds
	console.log('Reply from ' + rinfo.address);
	console.log(cam.hostname + ':' + cam.port + cam.path);
})
onvif.Discovery.probe();
