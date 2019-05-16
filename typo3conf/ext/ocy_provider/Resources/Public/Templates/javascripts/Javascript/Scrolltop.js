// JavaScript Document
var animationSpeed = 0;
var clicked = false;
var isTouchDevice = 'ontouchstart' in window;

$(window).on("scroll touchmove", function(){
  $('#page.subpage').toggleClass('sticky-navbar', $(document).scrollTop() > 1);
  $('#page.subpage #navigation').toggleClass('sticky', $(document).scrollTop() > 1);
  $('#page.subpage #logo .logo').toggleClass('sticky', $(document).scrollTop() > 1);  
  
  
  var newHeight = $(window).height() - $('#navigation').height();
  $('#page.mainpage').toggleClass('sticky-navbar', $(document).scrollTop() > newHeight);
  $('#page.mainpage #navigation').toggleClass('sticky', $(document).scrollTop() > newHeight);
  $('#page.mainpage #logo .logo').toggleClass('sticky', $(document).scrollTop() > newHeight);  
  
});

// gaOptOut
//
$(document).ready(function() {
	$('.gaOptOutLink').on('click', function(ev) {
		ev.preventDefault();
		gaOptout();
		//alert("Sie haben Google Analytics erfolgreich deaktiviert.");
	});
	
	//$('#gaOptOutLinkEn').on('click', function(ev) {
		//ev.preventDefault();
		//gaOptout();
		//alert("You have successfully deactivated google analytics.");
	//});
});


// AmChart
//-----------------------------------------------
$(document).ready(function() {
	if($('#chartdiv').length > 0) {
		runAmchart();
	}
});

// SmoothScroll
function smoothScroll() {
	if($('a[href*="#"]:not([href="#"])').length > 0) {
		$('a[href*="#"]:not([href="#"])').on('click',function() {
			if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name='+ this.hash.slice(1)+ ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop : target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	}
}

//-----------------------------------------------

//Scroll totop
//-----------------------------------------------
$(document).ready(function(){
	$(".scrollToTop").fadeOut(0);
});

$(window).scroll(function(){
    if($(this).scrollTop() > 100) {
        $(".scrollToTop").fadeIn();
    } else {
        $(".scrollToTop").fadeOut();
    }
});

$(".scrollToTop").click(function() {
    $("body,html").animate({scrollTop:0},800);
});

//scrollToStart
//-----------------------------------------------
$(".scrollToStart").click(function() {
	$("body,html").animate({'scrollTop': $('#start').offset().top}, 800);
});
//-----------------------------------------------

$(document).ready(function(){
  $('.navbar-toggle').click(function() {
    $("body").toggleClass('navbar-open');
	$("#navbar-primary").toggleClass('nav-open');
	$(".navbar-header .navbar-toggle").toggleClass('collapsed');
	
	
  });
});

//Fullscreenslider
//-----------------------------------------------
$(document).ready(function(){
	if ($('.swiper-container .swiper-slide').length > 1) {
		var swiper = new Swiper('.swiper-container', {
		  direction: 'horizontal',
		  loop:true,
		  speed:1000,
		  centeredSlides: true,
		  autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		  },
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		  on: {
			  init: function() {
				  smoothScroll();
				  extendedSliderControls(this);
			  }
		  }
		});
	} else {
		if($('.fullscreen-content').find('video').length > 0) {
			$(window).on('scroll', function() {
				var shown = isInView($('.swiper-container'));
				var vid = $('.fullscreen-content').find('video')[0];
				if(!shown) {
					if(!vid.paused) {
						vid.pause();
					}
				} else {
					if(vid.paused) {
						vid.play();
					}
				}
			});
		}
		smoothScroll();
	}
//	$(".swiper-container").hover(function() {
//	console.log('a');
//	swiper.autoplay.stop();
//}, function() {
//	console.log('b');
//	swiper.autoplay.start();
//});
//    var v = document.getElementsByTagName("video")[0];
//
//    v.addEventListener("canplay", function () {
//        mySwiper.stopAutoplay();
//    }, true);
//
//    v.addEventListener("ended", function () {
//        mySwiper.startAutoplay();
//    }, true);	

});

function heightSlider() {
  var newHeight = $(window).innerHeight() + "px";
  $(".swiper").css("max-height", newHeight);
  $(".swiper-container").css("max-height", newHeight);
  $(".swiper-slide").css("max-height", newHeight);
  $(".video-cont video").css("height", newHeight);
  $(".fullscreen-content").css("height", newHeight);
}

$(document).ready(function () {
  heightSlider();
});
window.addEventListener('resize', heightSlider);
