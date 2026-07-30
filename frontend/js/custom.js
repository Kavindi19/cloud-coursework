
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


/* Mobile Navigation
    -----------------------------------------------*/
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});


/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(document).ready(function() {

  // ===============================
// Analytics Variables
// ===============================

let selectedEvent = null;
const viewedEvents = new Set();

function getEventDetails(programElement) {

    const programItem = $(programElement);

    const eventName = programItem.find("h3").text().trim();

    const eventId =
        $("#program .tab-pane .col-md-10").index(programItem) + 1;

    return {
        eventId: eventId,
        eventName: eventName,
        category: "Conference Program"
    };

}

// EVENT_CLICK

$("#program .tab-pane .col-md-10").css("cursor", "pointer");

$("#program .tab-pane .col-md-10").on("click", function () {

    selectedEvent = getEventDetails(this);

    window.trackAnalyticsEvent({
        eventType: "EVENT_CLICK",
        page: "Programs",
        eventId: selectedEvent.eventId,
        eventName: selectedEvent.eventName,
        category: selectedEvent.category
    });

    console.log("EVENT_CLICK recorded:", selectedEvent);

});

// EVENT_VIEW

function checkVisibleEvents() {

    $("#program .tab-pane.active .col-md-10").each(function () {

        const rect = this.getBoundingClientRect();

        if (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        ) {

            const event = getEventDetails(this);

            if (!viewedEvents.has(event.eventId)) {

                viewedEvents.add(event.eventId);

                window.trackAnalyticsEvent({
                    eventType: "EVENT_VIEW",
                    page: "Programs",
                    eventId: event.eventId,
                    eventName: event.eventName,
                    category: event.category
                });

                console.log("EVENT_VIEW recorded:", event);
            }
        }

    });

}

// REGISTRATION_ATTEMPT

$("#registrationForm").on("submit", function (event) {

    event.preventDefault();

    const email = $("#email").val().trim();

    window.trackAnalyticsEvent({
        eventType: "REGISTRATION_ATTEMPT",
        page: "Register",
        eventId: selectedEvent ? selectedEvent.eventId : 0,
        eventName: selectedEvent ? selectedEvent.eventName : "Unknown Event",
        category: selectedEvent ? selectedEvent.category : "Registration",
        userEmail: email
    });

    console.log("REGISTRATION_ATTEMPT recorded:", {
        email: email,
        selectedEvent: selectedEvent
    });

});

$(window).on("scroll load", checkVisibleEvents);

  /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


 /* Parallax section
    -----------------------------------------------*/
  function initParallax() {
    $('#intro').parallax("100%", 0.1);
    $('#overview').parallax("100%", 0.3);
    $('#detail').parallax("100%", 0.2);
    $('#video').parallax("100%", 0.3);
    $('#speakers').parallax("100%", 0.1);
    $('#program').parallax("100%", 0.2);
    $('#register').parallax("100%", 0.1);
    $('#faq').parallax("100%", 0.3);
    $('#venue').parallax("100%", 0.1);
    $('#sponsors').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.2);

  }
  initParallax();


  /* Owl Carousel
  -----------------------------------------------*/
  $(document).ready(function() {
    $("#owl-speakers").owlCarousel({
      autoPlay: 6000,
      items : 4,
      itemsDesktop : [1199,2],
      itemsDesktopSmall : [979,1],
      itemsTablet: [768,1],
      itemsTabletSmall: [985,2],
      itemsMobile : [479,1],
    });
  });


  /* Back top
  -----------------------------------------------*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
        $('.go-top').fadeIn(200);
        } else {
          $('.go-top').fadeOut(200);
        }
        });   
        // Animate the scroll to top
      $('.go-top').click(function(event) {
        event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
      })


  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();

  });

