const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const app=express();

var infoServer="https://apiv2.bitcoinaverage.com/convert/global"

app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
	console.log("server use port 3000");
});



app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});
//infoServer+req.body.crypto+req.body.fiat
app.post("/",function(req,res){
	var crypto=req.body.crypto;
	var fiat=req.body.fiat;
	var amount= req.body.amount;
	var options={
		url: infoServer,
		method: "GET",
		qs:{
			from: crypto,
			to: fiat,
			amount: amount
		}
	};

	request(options, function (error, response, body) {
	var data= JSON.parse(body);
	price= data.price;
	time= data.time
	res.write("Current time is: "+ time)
	res.send("The price of " + amount +" " +crypto + " is: " + price + " " + fiat);
	});
});

