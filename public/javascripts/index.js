$( document ).ready(function() {
        $('.expandtripdiv').on('click', function() {
            $('.addtrip').animate({
                opacity: 1,
                height: 'toggle',
            }, 450 );
        });
        $('.expandtripdiv').on('click', function() {
            $('.plussign').toggleClass('fa-plus');
            $('.plussign').toggleClass('fa-minus');
        });
});


function getTrips() {
  $.ajax({
    url: "/profile",
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
});
}

$(".addtrip").on('click', function(){
    getTrips();
});
