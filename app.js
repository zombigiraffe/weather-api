const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "3780cc15e9ade1ac8673fadd99dcc951";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather in " + query + " is currently " + description + " and")
            res.write("<h2>the temperature in " + query + " is " + temp + " degrees Celsius.<h2>")
            res.write("<img src=" + imageURL + ">")
            res.send();
            console.log(temp, description);
        })
    })
})




app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})