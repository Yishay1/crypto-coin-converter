const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const app=express();

var infoServer="https://apiv2.bitcoinaverage.com/indices/global/ticker/"

app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
	console.log("server use port 3000");
});



app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});
//infoServer+req.body.crypto+req.body.fiat
app.post("/",function(req,res){
	request(infoServer+req.body.crypto+req.body.fiat, function (error, response, body) {
	var data= JSON.parse(body);
	res.send("The price of " + req.body.crypto + " is: " + data.last + " " + req.body.fiat);
	});
});

