const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

   res.sendFile(__dirname + "/index.html");
 })

app.post("/",function(req,res){
	const query=req.body.cityName;
    const apikey="e77c8617789c3ebc390aa9dbd503d7fc";
    const unit="metric";
	const url="https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&appid=" + apikey+ "&q=" +query;

	https.get(url, function(response){
		console.log(response.statusCode);

    response.on("data",function(data){
    	const weatherData=JSON.parse(data);
    	const max_temp=weatherData.main.temp_max;
    	const weatherDescription=weatherData.weather[0].description;
    	const icon=weatherData.weather[0].icon;
    	const imgURL=" http://openweathermap.org/img/wn/10d@2x.png";
    	res.write("<p>The weather is currently"+ weatherDescription+"</p>" );
    	res.write("<h1>The temperature in "+query+ " is="+ max_temp +"degree celcius.</h1>");
    	res.write("<img src="+imgURL+">");
    	res.send();
    })
 })
})



app.listen(3000, function(){
	console.log("server is running at 3000.");
})