function initialize() {
  var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var input = (document.getElementById("map-search"));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  var latVal = document.getElementById("lat");
  var lngVal = document.getElementById("lng");

  var handler = Gmaps.build('Google');
  handler.buildMap({ internal: {id: 'map'} }, function(){
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(displayOnMap);
  });

  var markers = [];

  function displayOnMap(position){
    latVal.value = position.coords.latitude;

    lngVal.value = position.coords.longitude;
    var marker = handler.addMarker({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    handler.map.centerOn(marker);
    handler.getMap().setZoom(15);
    markers.push(marker);
  };

  google.maps.event.addListener(handler.getMap(), 'click', function(event) {
    latVal.value = event.latLng.lat();

    lngVal.value = event.latLng.lng();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      handler.clusterer.removeMarker(markers[i]);
    }
    markers = [];
    var marker = handler.addMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    markers.push(marker);
    handler.map.centerOn(marker);
  });

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      handler.clusterer.removeMarker(markers[i]);
    }

    latVal.value = places[0].geometry.location.lat();

    lngVal.value = places[0].geometry.location.lng();

    markers = [];

    marker = handler.addMarker({
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
    });

    markers.push(marker);
    handler.map.centerOn(marker);

  });
}
google.maps.event.addDomListener(window, "page:load", initialize);
google.maps.event.addDomListener(window, "load", initialize);