import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
var wpi = require('wiring-pi');


wpi.setup('wpi');

var pin = 0;

wpi.pinMode(pin, wpi.OUTPUT);

var value = 1;

//setInterval(function() {
//  console.log("set to ", value);
//  wpi.digitalWrite(pin, value);
//  value = +!value;
//}, 5000);

 	
let app = express();
let io;
app.server = http.createServer(app);
io = require("socket.io")(app.server);


let client_socket_io = require("socket.io-client")(config.main_server);

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

io.on("connection", ( socket ) => {
	console.log("UUHUU!! Raspberry pi got connected!");
	socket.on("hello", ( msg ) => {
		console.log("==>> message from server ==>> "+ msg);
		client_socket_io.emit("hello","@server Let's! change the world");
	});
	socket.on("ebulb", (msg) => {
		try{
			wpi.digitalWrite(pin, msg == "on" || msg == 1 ? 1 : 0 );
			console.log("==>> message from server ==>> Electric bulb set to: " + msg );
			client_socket_io.emit("ebulb", "Electric bulb set to: " + msg);
		} catch( execption ) {
			console.log("==>> message from server ==>> Exception occured ): " + msg );
		}
		//exec('sudo python /var/www/html/gpio.py ' + msg , (error, stdout, stderr) => {
		//	if (error) {
		//  		console.error(`exec error: ${error}`);
    	//			return;
 		//	 }
		//	 console.log(`stdout: ${stdout}`);
		//	 console.log(`stderr: ${stderr}`);
		//});
		
	});
});


// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
	console.log(config, db);
});

export default app;
