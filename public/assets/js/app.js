

// Grab the news articles as a json
$.getJSON("/newsArticles", function(data) {
	// For each one
	for (var i = 0; i < data.length; i++)  {
		console.log(data[i]);
		// Display the apropriate info on the page
		$("#newsArticles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title +  "</h3>" + 
		 "<a href = '" + " http://www.charlottemagazine.com/" + data[i].link +  "'>" + " http://www.charlottemagazine.com/" + data[i].link  +  "</a>"  +
			"<div data-summary='"  +  data[i].summary  + "'>" + data[i].summary  + "></div>"  +  "<div data-item-byline='"  +  data[i].itemByline  +  "'>"  +  data[i].itemByline + "</p>");
		$("#newsArticles").append("<a href='http://www.charlottemagazine.com/" + data[i].link + "'>" + "<img src='"  +  data[i].image + "'></a>" );
	}
});

// Whenever someone clicks a "h3" tag
$(document).on("click", "h3", function()  {

	// Empty the reviews from the review section
	//$("#reviews").empty();
	// Save the id from the p tag
	var thisId = $(this).attr("data-id");

	// Now make an ajax call for the NewsArticles
	$.ajax({
		method: "GET",
		url: "/NewsArticle/" + thisId
	})

	// With that done, add the reviews information to the page
	.done(function(data) {
		//for (var i = 0; i < data[i].length; i++)  {
		//console.log(data[i]);
		// The title of the newsArticle
		$("#reviews").append("<br>" + "<h4> Enter a Review! </h4>");

		// An input to enter a new title for the new review
		$("#reviews").append("<input id = 'titleinput' name = 'title' >" + "<br>");

		// A textarea to add a new review body
		$("#reviews").append("<textarea id = 'bodyinput' name = 'body'></textarea>" + "<br>");

		//A button to submit a new review in the newsArticle
		$("#reviews").append("<button class='btn btn-default' data-id = '" + data._id + "' id = 'savereview'> SAVE </button>");



		// If there's a review in the newsarticle
		if (data.reviews) {

			$("#reviews").append("<h4> Reviews </h4>");

			for (var c = 0 ; c < data.reviews.length; c++) {
			// Place the title of the review in the title input
//				$("#titleinput").val(data.reviews[0].title);
			// Place the body of the review in the body textarea
//				$("#bodyinput").val(data.reviews[0].body);
				$("#reviews").append("<h5>" + data.reviews[c].title + ": " + data.reviews[c].body + "</h5> " + 
					"<button class='btn btn-danger' data-id = '" + data.reviews[c]._id + "' id = 'deleteReview'> DELETE </button>"); 
			//A button to update a old review in the newsArticle
//		        $("#reviews").append("<button class='btn btn-danger' data-id = '" + data.reviews[c]._id + "' id = 'deleteReview'> DELETE </button>");
			}
		}
	});
  });


// When you click the savereview button
$(document).on("click", "#savereview", function() {

	// Grab the id associated with the newsArticle from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the review, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/NewsArticle/" + thisId,
		data: {

			// Value taken from title input
			title: $("#titleinput").val(),

			// Value taken from review textarea
			body: $("#bodyinput").val()
		}
	})

	  // With this done
	  .done(function(data) {

	  	// log the response
	  	console.log(data);

	  	// Empty the reviews section
	  	$("#reviews").empty();
	  });

	  // Also, remove the values entered in the input and textarea for review entry
	  $("#titleinput").val("");
	  $("#bodyinput").val("");

	// We will run the clear/Delete function 
});

// When you click the savereview button
$(document).on("click", "#deleteReview", function() {

	// Grab the id associated with the newsArticle from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the review, using what's entered in the inputs
	$.ajax({
		method: "DELETE",
		url: "/NewsArticleDelete/:" + thisId
	})
	  // With this done
	  .done(function(data) {
	  	// log the response
	  	console.log(data);

	  	// Empty the reviews section
	  	$("#reviews").empty();
	  });

});

// function showInput() {}




	 // function clearTable() {

	 //        var currentURL = window.location.origin;
	 //        $.ajax({ url: currentURL + "/api/clear", method: "POST" });
	 //      // Refresh the page after data is cleared
	 //        location.reload();
	 //      }

	 //      $("#clear").on("click", function() {

	 //       clearTable();
	      
	 //      // Clear the form after submitting

	 //          $("#name").val("");
	 //          $("#phone-no").val("");
	 //          $("#picture").val("");
	 //          $("#email").val("");
	 //          $("#unique-id").val("");
	 // });      
