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

    function showTrips(trips) {
        trips.forEach( (oneTrip) => {
            const trip =
            `<div class="col-sm-4 tripblock">
                <div class="tripRec">
                    <img class="tripThumb" src="${oneTrip.tripThumbnail}">
                    <div class="tripdesc">
                        <h2>${oneTrip.name}</h2>
                        <p><em>${oneTrip.location}<em></p>
                    </div>
                </div>
            </div>`;

            $('.tripContent').append(trip);
        });

    }

    getTrips();

});
