var net = require('net');

// 指定连接的tcp server ip，端口
var options = {
	host: '192.168.0.7',  
	port: 20001
}

var tcpClient = net.Socket();

// 连接 tcp server
tcpClient.connect(options,function(){
	var str1 = "88 04 03 02 01 88 77 66 55 44 33 22 aa";

	var strs = str1.split(" ");//将一个十六进制报文转为字符数组

	for (let i = 0;i < strs.length;i++){

		strs[i] = "0x" + strs[i];

	}//每个字符加上0x

	let buffer = Buffer.from(strs);//将数组放到buffer

	// udp_client.send(buffer,port,ip);//发送buffer
	console.log('connected to Server' + strs);
	tcpClient.write(buffer);
})

// 接收数据
tcpClient.on('data',function(data){
	console.log(data);
	console.log('received data: %s from server', data.toString());
	//TODO show the buffer
	for (let i = 0; i < data.length; i++){
		console.log("" + i + ": " + data[i]);
	}
})

tcpClient.on('end',function(){
	console.log('data end!');
})

tcpClient.on('error', function() {
	console.log('tcp_client error!');
})