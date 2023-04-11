const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(8000, function(){
  console.log("Server is running on port 8000.");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var query = req.body.cityName;
  var apiKey = "1916afd2fb206dae922803575e0a1735";
  var unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<p>The weather is currently " + description + ".</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();

    });
  });

});
