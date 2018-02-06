function getChildIndex (child){
  var parent = child.parentNode;
  var children = parent.children;
  var result;
  for (var i = 0; i < children.length; i++) {
    if (child === children[i]) {
      result = i;
    }
  }
  return result;
};
function changeWithClickActiveIndicator (indicator) {
  var indicators = document.getElementsByClassName('tbf-carousel-indicator');
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove('active');
  }
  indicator.classList.add('active');
}
function shiftTo(cardsCount, numberCard, step, contentWidth, clonsCount){
  var shiftToCardCent = (clonsCount + numberCard - 1) * step + (step / 2);
  var shiftToCentWrapper = contentWidth / 2;
  return -(shiftToCardCent - shiftToCentWrapper);
}
function initCarousel(initCard) {
  var cardsList = document.querySelector(".tbf-carousel .tbf-cards-list");
  var carouselContent = document.querySelector(".tbf-carousel .tbf-carousel-content");
  var cardsCount = cardsList.childElementCount;
  var step = cardsList.offsetWidth / cardsCount;
  var clonsCount = 3;
  var initStep = shiftTo(cardsCount, initCard, step, carouselContent.offsetWidth, clonsCount);
  var carousel = {
    cardsList: cardsList,
    cardsCount: cardsCount,
    clonsCount: clonsCount,
    step: step,
    initStep: initStep,
    active: initCard,
    contentWidth: carouselContent.offsetWidth
  }
  var cloneCardsList = carousel.cardsList.cloneNode(true);
  for (var i = carousel.cardsCount - 1; i >= carousel.cardsCount - carousel.clonsCount; i--) {
    var childClone = cloneCardsList.children[i].cloneNode(true);
    carousel.cardsList.insertBefore(childClone, carousel.cardsList.firstChild);
  }
  for (var i = 0; i < carousel.clonsCount; i++) {
    var childClone = cloneCardsList.children[i].cloneNode(true);
    carousel.cardsList.appendChild(childClone);
  }
  carousel.cardsList.style.transform = 'translateX(' + (carousel.initStep).toString() + 'px)';
  return carousel;
}

function calibrationCarousel(carousel){
  var carouselContent = document.querySelector(".tbf-carousel .tbf-carousel-content");
  var initStep = shiftTo(carousel.cardsCount, carousel.active, carousel.step, carouselContent.offsetWidth, carousel.clonsCount);
  carousel.cardsList.style.transform = 'translateX(' + (initStep).toString() + 'px)';
  return {cardsList: carousel.cardsList,
          cardsCount: carousel.cardsCount,
          clonsCount: carousel.clonsCount,
          step: carousel.step,
          initStep: initStep,
          active: carousel.active,
          contentWidth: carouselContent.offsetWidth};
}
function shiftAnimation(carousel, numberCard) {
  carousel.cardsList.style.transition = 'all 700ms ease';
  shift = shiftTo(carousel.cardsCount, numberCard, carousel.step, carousel.contentWidth, carousel.clonsCount);
  carousel.cardsList.style.transform = 'translateX(' + shift.toString() + 'px)';
}
function fullShift(carousel, numberCard, direction) {
  var shift = shiftTo(carousel.cardsCount, carousel.active, carousel.step, carousel.contentWidth, carousel.clonsCount);
  if (direction === 'to start') {
    shift = shift + carousel.step;
  } else if ('to end') {
    shift = shift - carousel.step;
  }
  carousel.cardsList.style.transition = 'none';
  carousel.cardsList.style.transform = 'translateX(' + shift.toString() + 'px)';
  var timerShift = setTimeout(function(){
    shiftAnimation(carousel, numberCard);
    clearTimeout(timerShift);
  }, 50);
}
function getActiveIndicatorNumber(){
  var indicators = document.getElementsByClassName('tbf-carousel-indicator');
  var result;
  for (var i = 0; i < indicators.length; i++) {
    if (indicators[i].classList.contains('active')) {
      result = i;
    }
  }
  return result;
}
function setAndReturnActiveIndicator(carousel, direction){
  var indicators = document.getElementsByClassName('tbf-carousel-indicator');
  var oldActiveIndicatorNumber = getActiveIndicatorNumber();
  var activeIndicator;
  switch(direction) {
    case 'to-right':
      if (oldActiveIndicatorNumber === carousel.cardsCount - 1) {
        activeIndicator = indicators[0];
      } else {
        activeIndicator = indicators[oldActiveIndicatorNumber + 1];
      }
      break;
    case 'to-left':
      if (oldActiveIndicatorNumber === 0) {
        activeIndicator = indicators[carousel.cardsCount - 1];
      } else {
        activeIndicator = indicators[oldActiveIndicatorNumber - 1];
      }
      break;
  }
  indicators[oldActiveIndicatorNumber].classList.remove('active');
  activeIndicator.classList.add('active');
  return activeIndicator;
}
function process(indicator, carousel) {
  carousel.oldActive = carousel.active;
  carousel.active = parseInt(indicator.dataset.numberCard);
  if (carousel.oldActive === carousel.cardsCount && carousel.active === 1) {
    fullShift(carousel, carousel.active, 'to start');
  }else if (carousel.oldActive === 1 && carousel.active === carousel.cardsCount) {
    fullShift(carousel, carousel.cardsCount, 'to end');
  }else {
    shiftAnimation(carousel, carousel.active);
  }
}
document.addEventListener("BQTLoaded", function(event) {
  var carousel = initCarousel(1);

  var carouselIndicators = document.getElementsByClassName("tbf-carousel-indicator");
  for (var i = 0; i < carouselIndicators.length; i++) {
    carouselIndicators[i].addEventListener("click", function() {
      changeWithClickActiveIndicator(this);
      process(this, carousel);
    });
  }

  var carouselArrowsRight = document.querySelectorAll('.carousel-arrow-right');
  for (var i = 0; i < carouselArrowsRight.length; i++) {
    carouselArrowsRight[i].addEventListener("click", function() {
      var activeIndicator = setAndReturnActiveIndicator(carousel, 'to-right');
      process(activeIndicator, carousel);
    });
  }

  var carouselArrowsLeft = document.querySelectorAll('.carousel-arrow-left');
  for (var i = 0; i < carouselArrowsLeft.length; i++) {
    carouselArrowsLeft[i].addEventListener("click", function() {
      var activeIndicator = setAndReturnActiveIndicator(carousel, 'to-left');
      process(activeIndicator, carousel);
    });
  }

  // var hammer = new Hammer(carousel.cardsList);
  // hammer.on('swipe', function(event) {
  //   if (event.deltaX > 0) {
  //     var activeIndicator = setAndReturnActiveIndicator(carousel, 'to-left');
  //     process(activeIndicator, carousel);
  //   }
  //   if (event.deltaX < 0) {
  //     var activeIndicator = setAndReturnActiveIndicator(carousel, 'to-right');
  //     process(activeIndicator, carousel);
  //   }
  // });

  var resizeTimer;
  window.addEventListener("resize", function(event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      carousel = calibrationCarousel(carousel);
    }, 250);
  });
});