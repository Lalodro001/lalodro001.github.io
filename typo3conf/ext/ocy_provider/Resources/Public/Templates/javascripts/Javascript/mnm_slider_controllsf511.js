var mySwiper = null;
var slidePackage = {};
var triggered = false;

function eventPlay() {
}

function eventPause() {
	if(slidePackage[mySwiper.previousIndex]) {
		syncTime = slidePackage[mySwiper.previousIndex].lastPlayed.currentTime;
		if(syncTime !== undefined) {
			syncBundle(mySwiper.previousIndex, syncTime);
		}
		mySwiper.autoplay.start();
	}
}

function eventEnded() {
	resetBundle(mySwiper.realIndex + 1);
	mySwiper.slideNext();
	mySwiper.autoplay.start();
}


function extendedSliderControls(swiper) {
	// initialize data
	mySwiper = swiper;
	bundleSlides();
	
	// do startup checks
	setTimeout(function() {
		if(slidePackage[mySwiper.realIndex + 1].isVideo) {
			slidePackage[mySwiper.realIndex + 1].lastPlayed = $(slidePackage[mySwiper.realIndex + 1]['slides'][0]).find('video')[0];
			mySwiper.autoplay.stop();
			playBundle(mySwiper.realIndex + 1);
		}
	},300);
	
	mySwiper.on('slideChangeTransitionStart', function(ev) {
		if(slidePackage[mySwiper.previousIndex].isVideo) {
			pauseBundle(mySwiper.previousIndex);
		}
	});
	
	mySwiper.on('slideChangeTransitionEnd', function(ev) {
		if($('.swiper-container:hover').length > 0) {
			mySwiper.autoplay.stop();
		}
		if(slidePackage[mySwiper.realIndex + 1].isVideo) {
			playBundle(mySwiper.realIndex + 1);
			mySwiper.autoplay.stop();
		}
	});
	
	$('.swiper-container').hover(function(ev) {
		if(!slidePackage[mySwiper.realIndex+1].isVideo) {
			mySwiper.autoplay.stop();
		}
	}, function(ev) {
		if(!slidePackage[mySwiper.realIndex+1].isVideo) {
			mySwiper.autoplay.start();
		}
	});
	
	if($('.fullscreen-content').find('video').length > 0) {
		$(window).on('scroll', function() {
			var shown = isInView($('.swiper-container'));
			var isVideo = slidePackage[mySwiper.realIndex+1].isVideo;
			if(!shown && isVideo) { pauseBundle(mySwiper.realIndex+1); }
			if(shown && isVideo) { playBundle(mySwiper.realIndex+1); }
			if(!shown && !isVideo && mySwiper.autoplay.running) { mySwiper.autoplay.stop(); }
			if(shown && !isVideo && !mySwiper.autoplay.running) { mySwiper.autoplay.start(); }
		});
	}
}

function bundleSlides()  {
	var groupy = {};
	$(mySwiper.slides).each(function(index,slide) {
		var trolldex = $(slide).data('swiper-slide-index') + 1;
		if(groupy[trolldex]) {
			var addUp = groupy[trolldex]['slides'];
			addUp.push(slide);
		} else {
			var addUp = [slide];
		}
		
		if($(slide).find('video').length > 0) {
			var v = $(slide).find('video');
			v.on('ended', eventEnded);
			v.on('play', eventPlay);
			v.on('pause', eventPause);
		}

		if($(slide).find('video').length > 0) {
			$(slide).find('video')[0].pause();
		}
		
		groupy[trolldex] = {
			slides: addUp,
			isVideo: $(slide).find('video').length > 0 ? true : false,
			lastPlayed: false
		};
	});
	
	slidePackage = groupy;
}

function pauseBundle(index) {
	$(slidePackage[index]['slides']).each(function(i,v) {
		if($(v).find('video').length > 0) {
			$(v).find('video')[0].pause();
		}
	});
}

function playBundle(index) {
	$(slidePackage[index]['slides']).each(function(i,v) {
		if($(v).find('video').length > 0) {
			$(v).find('video')[0].play();
		}
	});
}

function resetBundle(index) {
	$(slidePackage[index]['slides']).each(function(i,v) {
		if($(v).find('video').length > 0) {
			$(v).find('video')[0].currentTime = 0;
		}
	});
}

function syncBundle(index, time) {
	$(slidePackage[index]['slides']).each(function(i,v) {
		if($(v).find('video').length > 0) {
			$(v).find('video')[0].currentTime = time;
		}
	});
}

function isInView(element) {
	var elementTop = $(element).offset().top;
	var elementBottom = elementTop + $(element).outerHeight();
	
	var mainContentTop = $('.main-content').position().top;
	var viewportTop = $(window).scrollTop();
	
	return mainContentTop > viewportTop;
};

