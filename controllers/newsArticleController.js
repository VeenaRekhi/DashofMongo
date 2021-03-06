// Using expres to perform our server operations
var express = require("express");

// Using routers the routes for the server
var router = express.Router();

// Import the model (NewsArticle.js) to use its database functions.
var NewsArticle = require("../models/NewsArticle.js");
var Review = require("../models/Review.js");

//===========================================================================================
router.get("/", function(req, res) {//=== For this we need "get"
  NewsArticle.all(function(data) {  // request function "route" to define data
  var hbsObject = {
      NewsArticles: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//=========================================================================================== 

router.put("/:id", function(req, res) { // Redirecting the route for "object NewArticle" with 
  var condition = "id = " + req.params.id; // a given "id" for "condition: review" 

  console.log("condition", condition);

  NewsArticle.findOneAndUpdate({}, { $push: { "reviews": doc._id } }, { new: true }, function(err, newdoc) { //== Now updating the response with the given "condition"
    review: req.body.review
  }, condition, function() {
    res.redirect("/");
  });
});

//=========================================================================================== 

// This will help the news articles we scraped from the mongodb.
router.get("/NewsArticles", function(req, res) {

  // Grab every document in the NewsArticles array
  NewsArticle.find({}, function(error, doc) {

    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

//=========================================================================================== 

// Grab a news article by it's ObjectID
router.get("/NewsArticle/:id", function(req, res) {

console.log(req.params.id);
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  NewsArticle.findOne({ "_id": req.params.id })

  //   .. and populate all of the reviews associated with it.
  .populate("reviews")

  // now, execute our query

  .exec(function(error, doc)  {

    console.log(doc);
    // Log any error
    if (error)  {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

//=========================================================================================== 

// Create a new review or replace an existing review
router.post("/NewsArticle/:id", function(req, res) {

  // Create a new review and pass the req.body to the entry
  var newReview = new Review( req.body);

  // And save the new review to the db
  newReview.save(function(error, doc)  {

    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the newsarticle id to find and update it's review
      NewsArticle.findOneAndUpdate({}, { $push: { "reviews": doc._id } }, { new: true }, function(err, newdoc) {
       // Send any errors to the browser
        //console.log(newdoc);
        if (error) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          //console.log(newdoc);
          res.send(newdoc);
        }
      });
    }
});
});

  // Route to see what NewsArticle looks like WITH populating
router.get("/populateNewsArticle/:id", function(req, res) {
  // Prepare a query to find all users..
  NewsArticle.findOne({})
    // ..and on top of that, populate the notes (replace the objectIds in the notes array with bona-fide notes)
    .populate("reviews")
    // Now, execute the query
    .exec(function(error, NewsArticle) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
        console.log("NewsArticle");
      }
      // Or send the doc to the browser
      else {
        res.send(doc);
      }
    });
});


//====================================================================================
router.delete("NewsArticle/:id", function(req, res) {  // Using the request "put" for a specific "condition"
  var condition = "id = " + req.body.id;  // with a given "id" for "delete" route.

  console.log("condition", condition);

  Review.findByIdAndRemove(req.params.reviewId, function(err, review) {// === Now updating the response with the given "condition"
    //review: req.body.id,
    //review: req.title.id
  var response = {
    message: "Review successfully deleted!",
    id: review._id
  };
    res.send(response);
  
  });
});



// //====================================================================================
// Export routes for server.js to use.
module.exports = router;