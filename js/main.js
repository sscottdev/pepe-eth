'use strict';

/* 0. Initialization */
// Get height on Window resized
$(window).on('resize',function(){
    var slideHeight = $('.slick-track').innerHeight();
	return false;
});

setTimeout(function(){

	$('.animate-rotate-1').animatedHeadline({
		animationType: 'rotate-1'
	});
	$('.animate-push').animatedHeadline({
		animationType: 'push'
	});
	$('.animate-slide').animatedHeadline({
		animationType: 'slide'
	});

    jQuery('.contractID').click(function(){

        var temp = $("<input>");
      $("body").append(temp);
     temp.val($('#contractIDtxt').text()).select();
      document.execCommand("copy");
      temp.remove();

	  alert('You have copied the Contract ID for Whale.')

       
    })


},1000)




jQuery('#enterAirdrop').click(function(){
	if(!jQuery('#InputAirdrop').val()){
		alert('HEY! You got to add a wallet address Whale!')
	}else{
		$.ajax({
			type: "POST",
			url: 'php/sendWalletAddress.php',
			dataType: 'json',
			data: JSON.stringify({'walletAddress': jQuery('#InputAirdrop').val()}),
			success: function(response)
			{
				if(response == 'found'){
					alert('It looks like you have already entered!  Thank you and good luck Whale!')
					jQuery('#InputAirdrop').val('')
				}else{
					alert('Success! You have entered the secret AirDrop surplus! We will notify the winners on Telegram! Keep a look out.')
					jQuery('#InputAirdrop').val('')
					startConfetti();
					setTimeout(function(){
						stopConfetti();
					},1500)
				}	 
		   }
	   });	
	}
})



// Show / hide menu
var menuItems = $('.header-top');
$('.menu-icon').on('click', function () {
	if (menuItems.hasClass('menu-visible')) {
		menuItems.removeClass('menu-visible');
	} else {
		menuItems.addClass('menu-visible');
	}
});
// Smooth scroll <a> links 
var $root = $('html, body');
$('a.s-scroll').on('click',function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});


// Scroll t onext/previou section
$('.p-footer a.down').on('click', function () {
	$.fn.fullpage.moveSectionDown();
});
$('.p-footer a.up').on('click', function () {
	$.fn.fullpage.moveSectionUp();
});

/* 1. Clock attribute */

var dateReadableText = 'Upcoming date';
    if($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')){
        $('.timeout-day').text('');
        dateReadableText = $('.site-config').attr('data-date-readable');        
        $('.timeout-day').text(dateReadableText);
    }
$('.clock-countdown').downCount({
    date: $('.site-config').attr('data-date'),
    offset: +10
}, function () {
    //callback here if finished
    //alert('YES, done!');
    var zerodayText = 'An upcoming date';
    if($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')){
        $('.timeout-day').text('');
        zerodayText = $('.site-config').attr('data-zeroday-text'); 
    }
    $('.timeout-day').text(zerodayText);
});


/* 2. Background for page / section */

var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-image-src');
	list[i].style.backgroundImage = "url('" + src + "')";
	list[i].style.backgroundRepeat = "no-repeat";
	list[i].style.backgroundPosition = "center";
	list[i].style.backgroundSize = "cover";
}

/* Background color as data attribut */
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-bgcolor');
	list[i].style.backgroundColor = src;
}

/* Background slide show Background variables  */
var imageList = $('.slide-show .img');
var imageSlides = [];
for (var i = 0; i < imageList.length; i++) {
	var src = imageList[i].getAttribute('data-src');
	imageSlides.push({src: src});
}


/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.page');

/* 3. Init all plugin on load */
$(document).ready(function() {
	/* Init console to avoid error */
	var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
	
	/* Init Slidesow background */
	 $('.slide-show').vegas({
        delay: 3000,
        shuffle: true,
        slides: imageSlides,
    	//transition: [ 'zoomOut', 'burn' ],
		animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
	
	/* Init video background */
	$('.video-container video, .video-container object').maximage('maxcover');
	
	/* Init youtube video background */
	if(backgroundVideoUrl != 'none'){
        
        //disable video background for smallscreen
        if($(window).width() > 640){
          $.okvideo({ source: backgroundVideoUrl,
                    adproof: true
                    });
        }
    }
	var pageSectionDivs = $('.section.page');
	var pageSections = [];
	var pageAnchors = [];
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function(pageSection , cb){
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function(err){
		
		/** Init fullpage.js */
		$('#mainpage').fullpage({
			menu: '#qmenu',
			anchors: pageAnchors,
			verticalCentered: false,
			responsive: 481,
			scrollOverflow: true,
			css3: false,
			navigation: true,
			onLeave: function(index, nextIndex, direction){
				arrowElem.addClass('gone');
				pageElem.addClass('transition');
	//			$('.active').removeClass('transition');
				slideElem.removeClass('transition');
				isSlide = false;
			},
			afterLoad: function(anchorLink, index){
				arrowElem.removeClass('gone');
				pageElem.removeClass('transition');
				if(isSlide){
					slideElem.removeClass('transition');
				}
			},

			afterRender: function(){}
		});
		$('#fp-nav').css("margin-top",0);
	});

	
});


// Page Loader : hide loader when all are loaded
$(window).load(function(){
    $('#page-loader').addClass('hidden');
});

// Email validation text, uncomment below to use them
/*
// Email registration 
var email_reg_elem = document.getElementById("reg-email");
email_reg_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
email_reg_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
// email message
var email_message_elem = document.getElementById("mes-email");
email_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
// name message
email_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var name_message_elem = document.getElementById("mes-name");
name_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This name field cannot be left blank");
	}
};
// text message
name_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var text_message_elem = document.getElementById("mes-text");
text_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This text field cannot be left blank");
	}
};
text_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
*/


var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately



(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}


	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();