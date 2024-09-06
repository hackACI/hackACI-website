$(document).ready(function() {
  const $video1 = $('#hero-video-1');
  const $video2 = $('#hero-video-2');

  function switchVideo() {
      $video1.on('ended', function() {
          $video1.fadeOut(500, function() {
              $video2.fadeIn(500).get(0).play();
          });
      });

      $video2.on('ended', function() {
          $video2.fadeOut(500, function() {
              $video1.fadeIn(500).get(0).play();
          });
      });

      // Start with video 1
      $video2.hide();
  }
  if ($video1.length && $video2.length){
    switchVideo(); // Initialize the video switching
  }
});

$(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    var parallaxSpeed = 0.8; // Adjust the speed as needed

    $('#hackVid').css('transform', 'translateY(' + (scrollTop * parallaxSpeed) + 'px)');
});

$(".schc-link").hover(function(){
  $("#schc").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".elegoo-link").hover(function(){
  $("#elegoo").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".echo3d-link").hover(function(){
  $("#echo3d").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".interviewcake-link").hover(function(){
  $("#interviewcake").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".genxyz-link").hover(function(){
  $("#genxyz").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".torontomu-link").hover(function(){
  $("#torontomu").toggle();
  $(".sponsor-div-tcontainer").toggle();
});

$(".wolfram-link").hover(function(){
  $("#wolfram").toggle();
  $(".sponsor-div-tcontainer").toggle();
});
