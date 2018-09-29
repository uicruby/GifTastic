var topics = ['Skunks', 'Elephant', 'Snake', 'Tiger', 'Cheetah', 'Lion', 'Monkey'];

// a function to create a button of all elements in array
function button() {
    $('#panel').empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        button.addClass('animalButton');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        $("#panel").prepend(button);
    }
    addgif();
    //addSound();
};
function addSound() {

    $('#submit').on('click', function (e) {
        e.preventDefault();
        //    var p=$(this).data('name');
        //    var query    ="GET https://www.googleapis.com/youtube/v3/search" + p + "AIzaSyDj8nQkKtYUX1DyaGo6E43_gywHp4xWoSY";

        //    $.ajax({
        //     url: query,
        //     method: 'GET',
        //     part: 'snippet',
        //     p: 'surfing',
        //     type:'video'
        // })
        // .done(function(responseSong){
        // var resultSong=responseSong.data;
        // console.log(resultSong);
        var chanelName='uic.ruby';
        var request = gapi.client.youtube.search.list({
            q: encodeURIComponent($("#animal_input").val()).replace(/%20/g, "+"),
            order: 'viewcount',
            part: 'snippet',
            type: 'video',
            maxResults: 3,
            publishedAfter: "2015-01-01T00:00:00Z",
            forUsername: chanelName

        });
request.execute(function(response){
console.log(response);
});

    });
}
addSound();



// made a function to display giphy's
function addgif() {

    // on every click of the button. Here button is name of the variable storing button
    $('button').on('click', function () {

        // storing the data-name on the button to variable p
        var p = $(this).data('name');
        // console log this and name to check if i am getting the right result
        console.log(this);
        console.log(p);

        // api is stored in variable queryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                var result = response.data; // stores the data of object in variable response
                console.log(result);

                // as the limit for the response we set is 10 in queryURL, so the length will be equal to 10.
                console.log(result.length);

                // we set a loop that starts from zero to the length of resonse ie. 10
                for (var i = 0; i < result.length; i++) {

                    var gifDiv = $("<div class='giphy'>"); //creating a new div with class giphy

                    var rating = result[i].rating;  // stores rating of every clicked object in variable rating 

                    //console.log(rating);

                    var p = $('<p>').text('Rating: ' + rating); // creates a paragraph tag to store rating

                    var giphyImg = $('<img>'); // creates an image tag to store still image of all giphy's

                    //sets attributes to image tag. That is,
                    // sets src, data-still, data-animate
                    giphyImg.attr('src', result[i].images.fixed_height_still.url);
                    giphyImg.attr('data-still', result[i].images.fixed_height_still.url);
                    giphyImg.attr('data-animate', result[i].images.fixed_height.url);
                    giphyImg.attr('data-state', result[i].images.fixed_height_still.url, 'still');

                    //appends rating and image to created div tag ie in gifdiv
                    gifDiv.append(p);
                    gifDiv.append(giphyImg);

                    //prepends rating and images to html
                    $('#giphy').prepend(gifDiv);

                }
                $('.giphy').children('img').on('click', function () {

                    //store the data-state of clicked button to variable state
                    var state = $(this).attr('data-state');

                    // check if state is still
                    if (state == 'still') {

                        // change it to 'animated' and set the data state to 'animate'
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    }
                    else {

                        // change the state to 'still' and set the data state to 'still'
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });



            });
        $('#giphy').empty();  //will replace the exixting giphy's on the page
    });
}
$('#submit').on('click', function (event) {
    // event.preventDefault();  //you can use this instead of return false too.
    var input = $('#animal_input').val().trim();
    topics.push(input);
    button();
    return false; // is help prevent default behaviour

});
button();

