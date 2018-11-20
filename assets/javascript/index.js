var num = ["Fullmetal Alchemist", "Attack on Titan", "Cowboy Bebop", "Dragon Ball", "My Hero Academia"];
// Display gifs
function displayGifs() {
  // Set API keys and variables
  var apiKey = 'GcvdVseivVehXTeUt9Onvn2JlpxuZEq6';
  var searchTerm = $(this).attr("data-name");
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=10";
  // Empty previous gifs
  $("#gif-bank").empty();

  // Make a request to API
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    // Display X amounts of gifs specified with rating
    var results = response.data;
    results.forEach(function(result) {
      // Create a new div with rating and image
      var gifDiv = $("<div>");
      // Set rating for gif
      var gifRating = $("<p>");
      gifRating.text("Rating: " + result.rating);
      var gif = $("<img>");
      // Create image for gif
      gif.attr({
        "src": result.images.fixed_height_still.url,
        "data-animate": result.images.fixed_height.url,
        "data-still": result.images.fixed_height_still.url,
        "data-state": "still"
      });
      gif.addClass("gif-img");
      // Attach both to gifDiv
      gifDiv.append(gif);
      gifDiv.append(gifRating);
      gifDiv.addClass("gif");
      // Add gifDivs to gif-bank
      $("#gif-bank").prepend(gifDiv);
    });
  })
};

// Render button with word inside
function renderBtns() {
  // Empties contents of button bank
  $("#btn-bank").empty();
  // For each item in the word array, make a button
  num.forEach(function(number) {
    var wordBtn = $("<button>");
    wordBtn.addClass("word-btn");
    wordBtn.attr("data-name", number);
    wordBtn.text(number);
    $("#btn-bank").append(wordBtn);
  });
};

// On search button click, search for term
$("#search-btn").on("click", function(event) {
  event.preventDefault();
  var word = $("#search-term").val().trim();
  // If input is not empty
  if (word !== "") {
    num.push(word);
    renderBtns();
    $("#search-term").val("");
  }
});

// User clicks on gif
$(document).on("click", ".gif-img", function() {
  var state = $(this).attr("data-state");
  // If gif is static, animate gif
  if (state === "still") {
    $(this).attr({
      "src": $(this).attr("data-animate"),
      "data-state": "animate"
    });
  }
  // If gif is animated, set gif to static
  else {
    $(this).attr({
      "src": $(this).attr("data-still"),
      "data-state": "still"
    });
  }
})

// User clicks on word button
$(document).on("click", ".word-btn", displayGifs);

renderBtns();
