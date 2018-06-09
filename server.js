var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();


// Set up Express Router
var router = express.Router();

require("./config/routes")(router);


// Make public folder static directory
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoNewsarticles";

mongoose.connect(db, function(error){
  if (error) {
    console.log(error);
  }
  else{
    console.log("mongoose connection is successful");
  }
});

// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);

// } else {

//   mongoose.connect(db, function (err) { //db = 'mongodb://localhost/yourdb'
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('mongoose connection is successful on: ' + db);
//     }
//   });
// }


app.listen(PORT, function(){
  console.log("Listening on port:" + PORT);
});