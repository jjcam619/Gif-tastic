
var animalArr = ["dog", "cow", "owl", "eagle", "deer"];


function displayButtons() {
    $("#gif-buttons").empty();
    for (var i=0; i<animalArr.length; i++) {
        console.log ("animals: ", animalArr[i]);
        var animalBtn = $("<button>");
        animalBtn.addClass("animal-btn");
        animalBtn.addClass("btn-block");
        animalBtn.attr("data-name", animalArr[i]);
        animalBtn.text(animalArr[i]);
        $("#gif-buttons").append(animalBtn);
    }
}

//makes neew button for animals
$("#add-animal").on("click", function() {
    var newAnimal=$("#animal-input").val().trim();
    animalArr.push(newAnimal);
    displayButtons();
});

//gif link-ajax
function displayAnimals() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=UeVdFoaIy5PFEMsFtJFEeVorJLMEvgpP&limit=10";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    
    }).then(function(response) {
        var results = response.data;
        for (var i=0; i<results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("d-inline-block");
            gifDiv.addClass("gif-section")
            
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " +rating);
            //start-stops gif
            var animalImg = $("<img>");
            animalImg.attr("src", results[i].images.fixed_height_still.url);
            animalImg.attr("data-still", results[i].images.fixed_height_still.url);
            animalImg.attr("data-animate", results[i].images.fixed_height.url);
            animalImg.attr("data-state", "still");
            animalImg.addClass("gifImg")
            
            gifDiv.append(p);
            gifDiv.append(animalImg);
            $("#gif-pics").prepend(gifDiv);
        }
    });
}

$(document).on("click", ".animal-btn", displayAnimals);
displayButtons();
//will start or stop gif depending on if playing or not playing
$(document).on("click", ".gifImg", function() {
    var state=$(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    
    } else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});