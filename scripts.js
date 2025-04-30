"use strict";


/*--- Local Storage ---*/
//lowkey I'm the most proud of this one, even though its simple

//this function looks to see if there is a name in the local storage. if not it will prompt the user to enter their name through an alert box. When the user returns, there name will in the hero 
$(function(){
    let name = localStorage.getItem("name");

    if(!name){
        name = prompt("Welcome to Echo Flora! Please enter your name so that it may echo through our site");
        if(name){
            localStorage.setItem("name", name);
        }
    }

    if(name){
        $("#user_name").text(name);
        $(".hidden").show();
    }

    
});

/*--- jQuery API ---*/
// this one almost made me cry but we figured it out!

$(function(){
    // these are my variables for my api url & pushing my data into the html document
    let plantCatalog = $("#plants");
    let urlStart = `https://perenual.com/api/species-list?key=`;
    let apiKey = "sk-SmSv681151b75949c10119";
    let endUrl = `&page=1`;
    
    // set the plant data to an empty array so that it can iterate through the json file
    let plantData = [];
    let currentIndex = 0;


    // in this function I formatted the information from my JSON that will be called in my Ajax function. This function also pushes my data into the html document
    function showPlant(index){
      let plant = plantData[index];
      let html = `<section class="plant-api">
      <img src="${plant.default_image.medium_url || " "}">
      <h4>${plant.common_name}</h4>
      <p>Scientific Name: ${plant.scientific_name.join(", ")}</p>
      <p>Watering: ${plant.watering}</p>
      <p>Sunlight: ${plant.sunlight}</p>
      </section>`;
      
      plantCatalog.html(html);
    }
  
    //in this Ajax function I called my showPlant() function that holds the syntax for what I want displayed on the page. Ajax actually calls on the JSON file to retrieve the data
    $.ajax({
        url: `${urlStart}${apiKey}${endUrl}`,
        dataType: "json"
    }).done(function(data){
        plantData = data.data;
      showPlant(currentIndex);
      
      // button to change the data
      $("#plant_btn").on("click", function(){
        currentIndex = (currentIndex + 1) % plantData.length;
        showPlant(currentIndex);
      });
  
  
    }).fail(function(jqXHR){
        //throws error if there is an issue with the database, just for safe keeping (jk its required)
      plantCatalog.html("There was an issue with the database");
      console.error(jqXHR.responseJSON.status_message);
    });
  });


  /*--- Carousel ---*/
$(document).ready(function() {
    // variables to grab the carousel images and display
    let slides = $('.slide');
    let slideIndex = 0;
    $(slides[slideIndex]).show();
    
    // this function iterates through my plant list with a fade in and out animation every 5 sec
    setInterval(function() {
        $(slides[slideIndex]).fadeOut();
        slideIndex = (slideIndex + 1) % slides.length;
        console.log(slideIndex);
        $(slides[slideIndex]).fadeIn();
    }, 5000); 
  });

  
  /*--- Accordion ---*/

  // jQueryUI accordion method, nice and simple :)
$(function(){
    $("#plant_care").accordion();
});