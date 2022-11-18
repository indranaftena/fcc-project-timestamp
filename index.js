// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  console.log("get empty params");
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/:time", function (req, res) {
  console.log("input:", req.params.time);
  const input = req.params.time;
  let date;
  if (/[^\d]/.test(input)){
    date = new Date(input);
  }
  else {
    date = new Date(parseInt(input));
  }
  console.log("isValidDate", date)
  if (isNaN(date)) {
    res.json({ error: "Invalid Date" });
  }
  else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
