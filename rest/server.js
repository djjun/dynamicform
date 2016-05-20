var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.post('/', function (req, res) {
   //res.status(500).send("Internal server error");        
   res.status(200).send(req.body);
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("app listening at http://%s:%s", host, port)

})
