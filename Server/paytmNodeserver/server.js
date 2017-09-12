
"use strict";
 var paytm_config = require('./paytm/paytm_config').paytm_config;
 var paytm_checksum = require('./paytm/checksum');
 var querystring = require('querystring');
 var bodyParser = require('body-parser');
 var http = require('http'),
 httpProxy = require('http-proxy'),
express = require('express');

var app = express();
//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.all("/", function(req, response) {
    response.writeHead(200 , {'Content-type':'text/html'});
			response.write('<html><head><title>Paytmdddddd</title></head><body>');
			response.write('</body></html>');
			response.end(); 
    
});
app.post("/generate_checksum", function(request, response) {

	console.log(request.body);

	console.log("murali")  

    var paramarray = {};
				paramarray['MID'] = paytm_config.MID; //Provided by Paytm
				paramarray['ORDER_ID'] = request.body.ORDER_ID; //unique OrderId for every request
				paramarray['CUST_ID'] = request.body.CUST_ID; // unique customer identifier 
				paramarray['INDUSTRY_TYPE_ID'] = paytm_config.INDUSTRY_TYPE_ID; //Provided by Paytm
				paramarray['CHANNEL_ID'] = paytm_config.CHANNEL_ID; //Provided by Paytm
				paramarray['TXN_AMOUNT'] = "1000";// transaction amount
				paramarray['WEBSITE'] = "APP_STAGING"; //Provided by Paytm
				paramarray["CALLBACK_URL"] = 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp';//Provided by Paytm
				paramarray['EMAIL'] = "mmm@gmail.com"; // customer email id
				paramarray['MOBILE_NO'] = "9966555519"; // customer 10 digit mobile no.
					paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, res) {
						console.log(res)
						console.log(err)	
						response.writeHead(200, {'Content-type' : 'text/json','Cache-Control': 'no-cache'});
						response.write(JSON.stringify(res));
						response.end();
					});
				

 
});
app.post("/verify_checksum", function(request, response) {

    if(request.method == 'POST'){
				var fullBody = '';
				request.on('data', function(chunk) {
					fullBody += chunk.toString();
				});
				request.on('end', function() {
					var decodedBody = querystring.parse(fullBody);
					response.writeHead(200, {'Content-type' : 'text/html','Cache-Control': 'no-cache'});
					if(paytm_checksum.verifychecksum(decodedBody, paytm_config.MERCHANT_KEY)) {
						console.log("true");
						console.log("succcccess--,,mmurali");
					}else{
						console.log("false");
					}
					 // if checksum is validated Kindly verify the amount and status 
					 // if transaction is successful 
					// kindly call Paytm Transaction Status API and verify the transaction amount and status.
					// If everything is fine then mark that transaction as successful into your DB.			
					
					response.end();
				});
			}else{
				response.writeHead(200, {'Content-type' : 'text/json'});
				response.end();
			}
});
function htmlEscape(str) {
  return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}

app.listen(4000);

// Listen for the `error` event on `proxy`.






//  app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

 
// var proxy = httpProxy.createProxyServer({});

// proxy.on('proxyReq', function(proxyReq, req, res, options) {
//   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });
// proxy.on('open', function (proxySocket) {

//   console.log("oprnProxy")
//   // listen for messages coming FROM the target here 
//   proxySocket.on('data', hybiParseAndLogMessage);
// });
 
// // 
// // Listen for the `close` event on `proxy`. 
// // 
// proxy.on('close', function (res, socket, head) {
//   // view disconnected websocket connections 
//   console.log('Client disconnected');
// });
// var server = http.createServer(function(req, res) {
//   // You can define here your custom logic to handle the request 
//   // and then proxy the request. 
//   proxy.web(req, res, {
//     target: "http://ec2-54-244-165-56.us-west-2.compute.amazonaws.com/sap/opu/odata/SAP/ZPRS_VALUE_HELP_SRV/UserDataSet(Uname='')?$format=json",
//     ws: true,
//     port: 8000
//   });
// }); 
 
// console.log("listening on port 5050")
// server.listen(5050)

