var topics = ["The Matrix", "The Notebook", "Pineapple Express", "The Lion King", "Frozen", "Tangled", "This is the End", "Ironman", "Ironman 2", "Thor", "The Avengers", "Titanic", "Aquaman", "Home Alone", "Dredd"];

function renderButtons() {
    $("#movies-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-outline-dark", "movie");
        a.attr("data-movie", topics[i]);
        a.text(topics[i]);
        $("#movies-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    var newMovie = $("#movie-input").val().trim();
    topics.push(newMovie);
    renderButtons();
});



$("button").on("click", function () {
    var movie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='col-md-4'");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height.url);
                movieImage.attr("src", results[i].images.original_still.url);
                movieImage.attr("data-still", results[i].images.original_still.url);
                movieImage.attr("data-animate", results[i].images.original.url);
                movieImage.attr("data-state", "still");
                movieImage.attr("class", "gif");
                movieImage.addClass("gif");
                gifDiv.prepend(movieImage);
                gifDiv.prepend(p);
                $("#gifs-appear-here").prepend(gifDiv);
                console.log(movieImage.results[i].images.original.url)
            }
        });
});
renderButtons();

$(document).on("click", ".btn", function () {
    var movie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height.url);
                // movieImage.attr()
                gifDiv.prepend(movieImage);
                gifDiv.prepend(p);
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });

});
renderButtons();

$(document).on("click", ".btn", function () {

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state === "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
});

