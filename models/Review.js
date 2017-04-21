

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class
var Schema = mongoose.Schema;

// Create the Review schema
var ReviewSchema = new Schema ({

	// Just a string
	title: {
		type: String
	},
	// just a string
	body: {
		type: String
	}
});

// Remember, Mongoose will automatically save the ObjectIds of the reviews
// These ids are referred to in the NewsArticle model

// Create the Review model with the ReviewSchema
var Review = mongoose.model("Review", ReviewSchema);

// Export the Review model to use it by other
module.exports = Review;