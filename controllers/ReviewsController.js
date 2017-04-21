// Using expres to perform our server operations
var express = require("express");

// Using routers the routes for the server
var router = express.Router();

// Import the model (NewsArticle.js) to use its database functions.
var NewsArticle = require("../models/NewsArticle.js");

// Import the model (burger.js) to use its database functions.
var Review = require("../models/Review.js");

//====================================================================================
// Grab a news article by it's ObjectID
router.get("/Review/:id", function(req, res) {

console.log(req.params.id);
	// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	Review.findOne({ "_id": req.params.id })

	//   .. and populate all of the reviews associated with it.
	.populate("reviews")

	// now, execute our query

	.exec(function(error, doc)  {

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
// New review creation via POST route
router.post("/submit", function(req, res) {
  // Use our Note model to make a new review from the req.body
  var newReview = new Review(req.body);
  // Save the new note to mongoose
  newReview.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }   
    // Otherwise
    else {
      // Find our newsArticle and push the new review id into the NewsArticles's review array
      Review.findOneAndUpdate({}, { $push: { "reviews": doc._id } }, { new: true }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.send(newdoc);
        }
      });
    }
  });
});

// // Create a new review or replace an existing review
// router.post("/submit", function(req, res) {

// 	// Create a new review and pass the req.body to the entry
// 	var newReview = new Review(req.body);

// 	// And save the new review to the db
// 	newReview.save(function(error, doc)  {

// 		// Log any errors
// 		if (error) {
// 			console.log(error);
// 		}
// 		// Otherwise
// 		else {
// 			// Use the newsarticle id to find and update it's review
// 			User.findOneAndUpdate({ "_id": req.params.id }, { "review": doc._id })

// 			// Execute the above query
// 			.exec(function(err, doc) {

// 				// Log any errors
// 				if (err) {
// 					console.log(err);
// 				}
// 				else {
// 					// Or send the document to the browser.
// 					res.send(doc);
// 				}
// 			});
// 		}
// 	});
// });
// //=========================================================================================== 

// router.put("/:id", function(req, res) { // Redirecting the route for "object NewArticle" with 
//   var condition = "id = " + req.params.id; // a given "id" for "condition: review" 

//   console.log("condition", condition);

//   Review.findOneAndUpdate({                //== Now updating the response with the given "condition"
//     review: req.body.review
//   }, condition, function() {
//     res.redirect("/");
//   });
// });

//====================================================================================
router.put("/:id", function(req, res) {  // Using the request "put" for a specific "condition"
  var condition = "id = " + req.body.id;  // with a given "id" for "delete" route.

  console.log("condition", condition);

  Review.delete({             // === Now updating the response with the given "condition"
    review: req.body.id
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
