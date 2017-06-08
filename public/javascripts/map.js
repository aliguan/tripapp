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
jiggle();
