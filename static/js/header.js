import { getCookie } from "./utils.js";

let hasFaded = false;
$(".dropdown-menu").on("click", function(){
  const svg = $(this).find("svg");
  svg.toggleClass("rotate");
  const dropdown = $(this).find(".dropdown");
  if (svg.hasClass("rotate")){
    dropdown.css("display", "");
    //dynamically adds spacing depending on number of elements
    let svgHeight = svg.outerHeight();
    dropdown.css("transform", `translatey(${svgHeight}px)`);
    $(this).addClass("active");
    hasFaded = true;
  }else{
    dropdown.animate(
      {
        opacity: 0
      },
      {
      duration: 300,
      complete: function(){
          dropdown.css("opacity", "");
          dropdown.css("display", "none");
          hasFaded = false;
          $(this).removeClass("active");
        }
      }
    )
  }
});
if ($(".username-dymn").length){
  $(".Login-link-li").parent().remove();
}
const accountModal = $(`
<div class="account-modal-container" role="dialog" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close-btn">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title">Quick Actions</h4>
            </div>
            <div class="modal-body">
                <a href="#" id="fullscreen" class="action-link">Toggle Fullscreen<ion-icon name="scan-outline"></ion-icon></a>
                <div class="user-actions">
                    <h3 class="section-title">Account<ion-icon name="chevron-forward-outline"></ion-icon></h3>
                    <a href="/account/" class="action-link">Profile Settings</a>
                    <a href="#" class="action-link logout-btn">Logout</a>
                </div>
                <div class="preferences">
                    <h3 class="section-title">Preferences<ion-icon name="chevron-forward-outline"></ion-icon></h3>
                    <a href="#" class="action-link">Language</a>
                </div>
            </div>
        </div>
    </div>
</div>
`);

$("body").append(accountModal);

$(".section-title").on("click", function() {
  const arrow = $(this).find("ion-icon");
  
  // Check the current rotation value
  const currentRotation = arrow.css("transform");
  
  if (currentRotation === 'none' || currentRotation === 'matrix(1, 0, 0, 1, 0, 0)') {
    // Rotate to 90 degrees
    arrow.css("transform", "rotate(90deg)");
    $(this).parent().children().each(function() {
        // If the current child does not have the class 'section-title', hide it
        if (!$(this).hasClass("section-title")) {
            $(this).css("display", "block");
        }
    });
  } else {
    // Rotate back to 0 degrees
    arrow.css("transform", "rotate(0deg)");
    $(this).parent().children().each(function() {
        if (!$(this).hasClass("section-title")) {
            $(this).css("display", "none");
        }
    });
  }
});
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

$('a[href="#"]').on('click', function(event) {
    event.preventDefault(); // Prevents the default action of the anchor tag
});

const fullScreenBtn = accountModal.find("#fullscreen");
let isFullscreen = false;

fullScreenBtn.on("click", function(){
  if (!isFullscreen){
    enterFullscreen(document.documentElement);
  }else{
    exitFullscreen();
  }
  isFullscreen = !isFullscreen;
});

const logoutBtn = accountModal.find(".logout-btn");
logoutBtn.on("click", function(){
  const button = $(this);
  $.ajax({
    url: "/api/logout/",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    headers: {
      'X-CSRFToken': getCookie("csrftoken")
    },
    success: function(response) {
        console.log("logout success!");

        // Create and insert success message
        const msgElement = $("<p>")
            .text("✅ Logged out.")
            .css({
                color: "lightgreen",
                margin: "1em"
            });
        button.parent().append(msgElement);

        // Reload the page after 1 second
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    },
    error: function() {
        console.error("Failed to log out.");
    }
  });
});


if ($(".username-dymn").length){
  $(".username-dymn").on("click", function(){
    accountModal.animate({ opacity: 1 }, 300);
    accountModal.css("display", "block");
    //modal is on -
    $("body").append('<div class="overlay-darken"></div>');
    $("body").css("overflow", "hidden");
    $("body").css("pointer-events", "none");
    accountModal.css("pointer-events", "auto");
    //disable clicking and scrolling above
  });
  accountModal.find(".close-btn").on("click", function(){
    accountModal.animate({ opacity: 0 }, 300, function() {
      accountModal.css("display", "none");
      $("body").css("overflow", "visible");
      $("body").css("pointer-events", "auto");
      $(".overlay-darken").remove();
    });
  });
}
