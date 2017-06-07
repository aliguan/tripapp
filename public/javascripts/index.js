$( document ).ready(function() {
        $('.expandtripdiv').on('click', function() {
            $('.addtrip').toggle();
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
                        <h2>${oneTrip.name}</h2>
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
        jiggle();
});


//GOOGLE MAP

    var sol = {
            lat: 22.286394,
            lng: 114.149139
    };

  var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
      zoom: 8,
      center: sol,
  };
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: sol
      });
  }

 
function jiggle() {
    let markers = [];
    mydest.forEach(function(destination){
        var address = destination.address;
        geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
        console.log(results[0]);
            map.setCenter(results[0].geometry.location);

            let title = destination.name;
            let position = results[0].geometry.location;

          var pin = new google.maps.Marker({ position, map, title  });
          markers.push(pin);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  });
}

    initialize();
