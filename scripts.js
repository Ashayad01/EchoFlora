/*--- Carousel ---*/
$(document).ready(function() {
    // Set Basic variables
    let slides = $('.slide');
    let slideIndex = 0;
    $(slides[slideIndex]).show();
    
    setInterval(function() {
        $(slides[slideIndex]).fadeOut();
        slideIndex = (slideIndex + 1) % slides.length;
        console.log(slideIndex);
        $(slides[slideIndex]).fadeIn();
    }, 5000); 
  });


/*--- Accordion ---*/
$(function(){
    $("#plant_care").accordion();
});