//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var finalUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;
  request(finalUrl, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.last;

    res.send("The current price for " + crypto + " is " +  price + fiat)
  });
});

app.listen(3000, function() {
  console.log("Server Running at port 3000");
});
