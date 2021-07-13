const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName ;
  const apikey="14020a7ef1c39fc938e99b769e346c18";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+ unit;
    //res.sendFile(__dirname + "/index.html
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weather=JSON.parse(data);
        const temp=weather.main.temp;
        const weatherDescription=weather.weather[0].description;
        const icon=weather.weather[0].icon;
        const imageUrl="https://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.write("<h1>The temperature in "+ query + " is "+ temp +" degree Celcius.");
        res.write("<p> The weather is currently " + weatherDescription+ "</p>");
        res.write("<img src="+imageUrl+">");
        res.send();
      });
    });

  });

app.listen(3000,function(){
  console.log("Server is started on port 3000")
});
