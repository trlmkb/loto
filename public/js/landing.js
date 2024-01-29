var cicle_active = true;
var total_stop = false;
var active_prize = "pot1";
/* COUNTDOWN */

var lastTime = ['00', '00', '00'];
jQuery(document).ready(function() {

  jQuery("#time").countdown({
    "date" : +jQuery('#game_time').val(),
    "htmlTemplate" : "%d%h%i%s",
    "updateTime" : 1000,
    "leadingZero" : true,
    "onChange" : function(){ recounter_vikings(); },
    // "onComplete" : function(){ location.reload() }
  });


  slider = $('.js-slider-content').bxSlider({
    pagerCustom: '#slider-pager',
    auto: true,
    autoHover: true,
    speed: 1000,
    pause: 4000,
    adaptiveHeight: true,
    // preventDefaultSwipeX: true,
    touchEnabled: false,
    swipeThreshold: 100
  });

  $(document).on('click','[data-go-to-slide]',function(e){
    e.preventDefault();
    var slide = $(this).attr('data-go-to-slide');
    slider.goToSlide(slide);
  });

});

function recounter_vikings() {
  var time = jQuery('#time').text().match(/../g), i;
  days = time[0].slice(0, 1) == '0' ? time[0].slice(1, 3) : time[0]
  jQuery('.js-timer').find('.days').text(days);
  jQuery('.js-timer').find('.hours').text(time[1] + ":" + time[2] + ":" + time[3]);
  // if (time[0]==1) {
  //   jQuery('#vikings2016 .counter-time-labels .days').text('Diena');
  // } else if (time[0]==0) {
  //   jQuery('#vikings2016 .counter-time-labels .days').text('Dienإ³');
  // }
}

var run = true;

function showEmailError(){
  
  jQuery('.prenumerata-add').slideToggle(500);
  jQuery('.email-error').slideToggle(500);
  
  if(run){  
    setTimeout(function(){run = false; showEmailError() }, 3000);
  }
}

function newEmail() {
  jQuery('#prenumerata-email').val(jQuery('#email_input').val()); 
  jQuery('#prenumerata-subscribe').click();
}