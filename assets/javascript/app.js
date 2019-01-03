var movies = ["The Matrix", "The Notebook", "Pineapple Express", "The Lion King", "Frozen", "Tangled", "This is the End", "Ironman", "Ironman 2", "Thor", "The Avengers", "Titanic", "Aquaman", "Home Alone", "Dredd"];

        function renderButtons() {
            $("#movies-view").empty();
            for (var i = 0; i < movies.length; i++) {
                var a = $("<button>");
                a.addClass("btn btn-outline-danger", "movie");
                a.attr("data-movie", movies[i]);
                a.text(movies[i]);
                $("#movies-view").append(a);
            }
        }

        $("#add-movie").on("click", function (event) {
            event.preventDefault();
            var newMovie = $("#movie-input").val().trim();
            movies.push(newMovie);
            renderButtons();
            
            $(document).on("click", ".movie");
        });

        

        renderButtons();

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
                        var gifDiv = $("<div>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var movieImage = $("<img>");
                        movieImage.attr("src", results[i].images.fixed_height.url);

                        gifDiv.prepend(movieImage);

                        gifDiv.prepend(p);

                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                });
        });
