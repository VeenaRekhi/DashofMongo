//mongodb://heroku_8vrwb2pc:c5gcj3cj5ivk1rtlhjmfn95m2o@ds111771.mlab.com:11771/heroku_8vrwb2pc

/* Using Mongoose's "Populated" method 
/* For SCRAPE only!!
/* ====================================================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var methodOverride = require("method-override");


// Requiring our "review" and "newsArticles" models
//var User = require("./models/User.js");
var Reviews = require("./models/Review.js");
var NewsArticles = require("./models/NewsArticle.js");

// Using routers the routes for the server
var router = express.Router();

// Our Scraping tools
var request = require("request");
var cheerio = require("cheerio");
//=============================================================================
//

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));

// Setting up Handlebars with the server.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs ({ defaultLayout: "main" })); //app listening to the handlebars engine 
app.set("view engine", "handlebars");

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_8vrwb2pc:c5gcj3cj5ivk1rtlhjmfn95m2o@ds111771.mlab.com:11771/heroku_8vrwb2pc");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Routes
//================================================================================

// A GET request to scrape the "charlottemagazine" website
app.get("/scrape", function(req, res) {

	// First we grab the body of "HTML" with request
	request("http://www.charlottemagazine.com/Buzz/", function(error, response, html) {
 
 		// Then, we load that into cheerio and save it to $ for a shorthand selector
		var $ = cheerio.load(html);
//		console.log(html);
		// Now, we grab every "h2" within an article tag, and do the following:
		//console.log("testing");
		//$(".article-image").each(function(i, element) {

		$(".article-item").each(function(i, element) {

			// Save an empty result object
			var result = {};

			// Add the next and href of every link and save them as properties of the result object
			result.image = $(this).find("img").attr("src");
			result.title = $(this).find(".article-title").children("a").text();
			result.link = $(this).find(".article-title").children("a").attr("href");
			result.summary = $(this).find(".article-content").children(".summary").text();
			result.itemByline = $(this).find(".article-content").children(".item-byline").text();
		        console.log(result);
            // Using our NewsArticle model, create a new entry
			// This effectively passes the result object to the entry (and the title and the link)
			var entry = new NewsArticles(result);

			// Now, save that entry to the db
			entry.save(function(err, doc) {

				// Log any errors
				if (err) {
					console.log(err);
				}
				// Or log the doc
				else {
					console.log(doc);
				}
			});
		});
	//});
});
// Tell the browser that we finished scraping the test
res.send("Scrape Complete!!");
});

// // This will het the news articles we scraped from the mongodb.
// app.get("/newsArticles", function(req, res) {

// 	// Grab every document in the NewsArticles array
//   NewsArticles.find({}, function(error, doc) {

//   	// Log any errors
//     if (error) {
//     	console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//     	res.json(doc);
//     }
//   });
// });

// // Grab a news article by it's ObjectID
// app.get("/newsArticle/:id", function(req, res) {

// console.log(req.params.id);
// 	// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
// 	NewsArticles.findOne({ "_id": req.params.id })

// 	//   .. and populate all of the reviews associated with it.
// 	.populate("reviews")

// 	// now, execute our query

// 	.exec(function(error, doc)  {

// 		// Log any error
// 		if (error)  {
// 			console.log(error);
// 		}
// 		// Otherwise, send the doc to the browser as a json object
// 		else {
// 			res.json(doc);
// 		}
// 	});
// });


// // Create a new review or replace an existing review
// app.post("/newsArticles/:id", function(req, res) {

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
// 			NewsArticles.findOneAndUpdate({ "_id": req.params.id }, { "review": doc._id })

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


// Import routes and give the express server port 3000 access to them.
var routes = require ("./controllers/newsArticleController.js");

app.use("/", routes);  // app listening on routes to the burger_controller.js

// App Listening on port 3000
app.listen(3000, function() {
	console.log("App running on port 3000!");
});