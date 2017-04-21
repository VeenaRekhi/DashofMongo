

// Require Mongoose

var mongoose = require("mongoose");

// Creating Schema class
var Schema = mongoose.Schema;

// Create article schema
var NewsArticleSchema = new Schema ({

    // Image is a required string
	image: {
		type: String,
		required: true
	},
	// Title is a required string
	title: {
		type: String,
		required: true
	},
	// Link is a required string
	link: {
		type: String,
		required: true
	},
	// Summary is a required string
	summary: {
		type: String,
		required: true
	},
	// Item-byline is a required string
	itemByline: {
		type: String,
		required: true
	},
	// This only saves one review's ObjectId, ref refers to the Review model
	review: {
		type: Schema.Types.ObjectId,
		ref: "Review"
	}
});

// Create the NewsArticle model with the NewsArticle Schema
var NewsArticle = mongoose.model("NewsArticle", NewsArticleSchema);

// Export the model 
module.exports = NewsArticle;