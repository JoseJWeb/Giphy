// Create buttons using a jQuery function upon the page loading
$(function(){
	populateButtons(searchArray,'searchButton','#buttonsArea');
	console.log("page loaded");
})


//(step 2) create a function called populateButtons which will take in a searchArray, a classToAdd to 
//every single button, and the area which is going to be adding to (areaToAdd)


// STEP 1 
//Start out by creating a variable called search array (step 1), which will house a bunch of strings
//those strings will be used to populate our search terms ["Dog", "Cat", "Bird"] to begin with, 
var searchArray = ["Dog", "Cat", "Bird"];

// STEP 2
//Create a function that populates the buttons-area with buttons
//That function will be called populateButtons which will take in a searchArray, a classToAdd to 
//every single button, and the area which it will be adding to, within the function 
//the .empty will empty the area everytime a new button is added, if not copies of our buttons are added


function populateButtons (searchArray,classToAdd,areaToAddTo){
	$(areaToAddTo).empty(); 
	for(var i=0;i<searchArray.length; i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type',searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);

	}
}

$(document).on('click','.searchButton',function(){
	$('#searches').empty();
	var type = $(this).data('type');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=R8Sl9gT1dYji7nf1iosWn0wIFNXBbrbo&limit=10';
	$.ajax({url:queryURL,method:'GET'})
		.done(function(response){
			console.log(response);
			for(var i=0;i<response.data.length;i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: '+rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url; // this gets our still image?
				var image = $('<img>');
				image.attr('src',still);
				image.attr('data-still',still);
				image.attr('data-animated',animated);
				image.attr('data-state','still');
				image.addClass('searchImage');
				searchDiv.append(p); //adding paragraph of gif rating
				searchDiv.append(image); // adding in image for the gif    
				$('#searches').append(searchDiv);
			}
		})
})

$(document).on('click','.searchImage',function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state','animated');
	} else {
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state','still');
	}
})


// LET'S CREATE A TEXT BOX THAT CAN ADD NEW BUTTONS BY USING jQuery 
$('#addSearch').on('click',function(){ 
	//This will grab whatever is stored in our text box and place it into our variable newSearch
	// eq.(0) means is looking for an input, specifically the first version (0) of the input 
	var newSearch = $('input').eq(0).val(); 
	searchArray.push(newSearch);
	populateButtons(searchArray,'searchButton','#buttonsArea');
	return false; 
})