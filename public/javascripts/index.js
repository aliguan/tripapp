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


    function getTrips() {
      $.ajax({
        method: "GET",
        url: "/api/profile",

        success: showTrips,
        error: function (err) {
          console.log(err);
        },
    });
    }

    $(".addtrip").on('click', function(){
        getTrips();
    });

    function showTrips(trips) {
        trips.forEach( (oneTrip) => {
            const trip =
            `<div class="col-sm-4">
                <img class="tripThumb" src="${oneTrip.tripThumbnail}">
                <p>${oneTrip.name}</p>
            </div>`;

            $('.trips').append(trip);
        });

    }

});
