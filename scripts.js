"use strict";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


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

    // localStorage.clear();
    
});


/* --  Plant API Carousel -- */

let plants = [];
let currentPlantIndex = 0;

const API_URL = "http://localhost:3000/api/plants";
const API_BASE_URL = "http://localhost:3000";

async function loadPlants() {
  const container = document.getElementById("plant-container");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load plants: ${response.status}`);
    }

    plants = await response.json();

    if (plants.length === 0) {
      container.textContent = "No plants are available.";
      return;
    }

    renderPlant();
  } catch (error) {
    console.error("Error loading plants:", error);
    container.textContent =
      "Unable to load plants. Please try again later.";
  }
}

function renderPlant() {
  const container = document.getElementById("plant-container");


  // Get the currently selected plant from the array
  const plant = plants[currentPlantIndex];

  if (!plant) return;

  const image = document.getElementById("plant-img");
  image.src = `${API_BASE_URL}${plant.image}`;
  image.alt = plant.name;

  // Show the common name
  const heading = document.getElementById("plant-name");
  heading.textContent = `${plant.name}`;

  // Show the scientific name
  const scientificName = document.getElementById("sceinceName");
  scientificName.textContent = `Scientific Name: ${plant.scientificName}`;

  const watering = document.getElementById("watering");
  watering.textContent = ` ${plant.wateringDetails}`;

  const light = document.getElementById("sunlight");
  light.textContent = `${plant.lightRequirements}`;

  const difficulty = document.getElementById("difficulty");
  difficulty.textContent = `Difficulty: ${plant.difficulty}`;

}

// Previous button
document.getElementById("prev-plant").addEventListener("click", () => {
  if (currentPlantIndex > 0) {
    currentPlantIndex--;
    renderPlant();
  }
});

// Next button
document.getElementById("next-plant").addEventListener("click", () => {
  if (currentPlantIndex < plants.length - 1) {
    currentPlantIndex++;
    renderPlant();
  }
});

// Load plant data from the API
loadPlants();

/*-- SHOP --*/
const swiper = new Swiper('.swiper', {
  freeMode: {
    enabled: true,
    sticky: true,
  },
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