$( document ).ready(function() {
        $('.expandtripdiv').on('click', function() {
            $('.addtrip').animate({
                height: 'toggle',
            });
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
            `<div class="col-sm-6 col-md-4 col-lg-3 tripblock">
                <div class="tripRec">
                    <a href="/trips/${oneTrip._id}"><img class="tripThumb" src="${oneTrip.tripThumbnail}"></a>
                    <div class="tripdesc">
                        <a href="/trips/${oneTrip._id}"><h2>${oneTrip.name}</h2></a>
                        <div class="hr">
                        </div>
                        <p><em>${oneTrip.location}</em></p>
                        <p>${oneTrip.content}</p>
                    </div>
                    <div class="hr">
                    </div>
                    <div>
                        <a href="/trips/${oneTrip._id}/edit">Edit</a>
                    </div>

                    <form action="/trips/${oneTrip._id}/delete" method="POST">
                        <button class="hvr-grow deletebtn" type="submit"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </form>
                </div>

            </div>`;

            $('.tripContent').append(trip);
        });

    }
    getTrips();
});
