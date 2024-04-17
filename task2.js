var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; 
var slideDurationSetting = 600; 
var currentSlideNumber = 0;
var totalSlideNumber = document.querySelectorAll(".parallax-section").length;


function parallaxScroll(evt) {
  var delta;

  if (isFirefox) {
    delta = evt.detail * (-120);
  } else if (isIe) {
    delta = -evt.deltaY;
  } else {
    delta = evt.wheelDelta;
  }

  if (ticking !== true) {
    if (delta <= -scrollSensitivitySetting) {
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}


function slideDurationTimeout(slideDuration) {
  setTimeout(function () {
    ticking = false;
  }, slideDuration);
}


var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);


function nextItem() {
  var $previousSlide = document.querySelectorAll(".parallax-section")[currentSlideNumber - 1];
  $previousSlide.querySelector(".imgBx").classList.remove("up-scroll");
  $previousSlide.querySelector(".imgBx").classList.add("down-scroll");
}

function previousItem() {
  var $currentSlide = document.querySelectorAll(".parallax-section")[currentSlideNumber];
  $currentSlide.querySelector(".imgBx").classList.remove("down-scroll");
  $currentSlide.querySelector(".imgBx").classList.add("up-scroll");
}
