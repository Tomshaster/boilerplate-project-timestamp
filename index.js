// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  if(!req.params.date){
    let unix = new Date().getTime()
    let utc = new Date().toUTCString()
    res.json({ unix: unix, utc: utc });
  }
  let rawDate = req.params.date;
  function dateIsValid(date) {
    if (
      typeof date === "object" &&
      date !== null &&
      typeof date.getTime === "function" &&
      !isNaN(date)
    ) {
      return true;
    }

    return false;
  }
  if (new Date(Number(rawDate))) {
    if (dateIsValid(new Date(rawDate))) {
    let unix = new Date(rawDate).getTime();
    let utc = new Date(rawDate).toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    let unix = Number(rawDate)
    let utc = new Date(Number(rawDate))
    console.log(utc)
    if (!dateIsValid(utc)) {
      res.json({error: "Invalid Date"})
    } else {
      res.json({unix: unix, utc: utc.toUTCString()});
    }
    
  }
}
  }
  );

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
