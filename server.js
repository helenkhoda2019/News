 var express = require ("express");
 var expresshandlebars = require("express-handlebars")
var axios = require("axios");
 var cheerio = require ("cheerio");
var app = express ();
const mongoose = require('mongoose');
var PORT = process.env.PORT|| 3000;
app.use(express.static("public"));
// app.use(router);

app.engine("handlebars", expresshandlebars ({
  defultlayout:"main"
 }));
 app.set("view engine","handlebars")
 
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);


var Article = require("./models/Article")
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

  // app.get ("/",function(req,res){
  //    res.send ("hello World");

  // });

  app.get("/all",function(req,res){

    Article.find({}).then(function(sucess){
        res.send(sucess)
    
    }).catch(function(error){
         console.log(error)
    })
  });
// // 
//   Headline - the title of the article

//   Summary - a short summary of the article

//   URL - the url to the original article

//  app.get ("/add/:title",function(req,res){
//     Article.create({
//         title:req.params.title,

//         summary:"this is summary"
//    }).then(function(sucess){
//         res.send(sucess)
    
//     }).catch(function(error){
//          console.log(error)
//     })
    

//  });

//  gets all data from our database.
// app.get("/all/article",function(req,res){
//   Article.find({

//   }).then(function(data){
//     res.send(data)
//   });
// });

//when user goes to this route we ll scrape and store article in database.

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then(function(response) {
        
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
          console.log(result);
  
        // Create a new Article using the `result` object built from scraping
        Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.redirect("/");
    });
  });

 
    // Routes to handlebars 
 
      app.get("/",function(req,res) {
        Article.find({
          
        }).then(function(data){
          console.log(data)
          res.render("home",{ 
            items:data
  
          }); 
        })
        

      });
      app.get("/saved",function(req,res){
        res.render("saved");
      });
    
//Routes to render to homepage and savedpage
//  app.get ("/",function (req,res){
  
//  });
//  app.get ("/saved",function(req,res){
//    res.render ("saved"); 
//  });
// //  app.get ("/api/featch",function (req,res){
//    Article.fetch (function(err,docs){
//      if (!doc|| docs. inserted count === 0){
//        res.jason({
//          message: "No new article today"
//        });
//      }
//      else { res.jason ({
//        message: "Added" + docs .insertedCount + "newarticle!"
//      });
//     }
//    });
//  }







app.listen( PORT, function() {
   console.log("App running on" + PORT );
  });
