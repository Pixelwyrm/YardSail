var a = 0;
var arr = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
var reload = false;

function addPost(lat, lng){
  arr[a][0] = lat;
  arr[a][1] = lng;
  a++;
}

var pos = [1, 2];

function addPost2(lat, lng){
  pos[0][0] = lat;
  pos[0][1] = lng;
  a++;
  reload = true;
}

function initialize() {

  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var input = (document.getElementById("map-search"));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  var latVal = document.getElementById("lat");
  var lngVal = document.getElementById("lng");

  var markers = [];

  var handler = Gmaps.build('Google');
  handler.buildMap({ internal: {id: 'map'} }, function(){
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(displayOnMap);
    var markers = handler.addMarkers([
    { lat: arr[0][0], lng: arr[0][1]},
    { lat: arr[1][0], lng: arr[1][1]},
    { lat: arr[2][0], lng: arr[2][1]},
    { lat: arr[3][0], lng: arr[3][1]},
    { lat: arr[4][0], lng: arr[4][1]},
    { lat: arr[5][0], lng: arr[5][1]},
    { lat: arr[6][0], lng: arr[5][1]},
    { lat: arr[7][0], lng: arr[5][1]},
    { lat: arr[8][0], lng: arr[5][1]},
    { lat: arr[9][0], lng: arr[5][1]}
  ]);
  });

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

  function displayPost(pLat, pLng){
    var marker = handler.addMarker({
      lat: pLat,
      lng: pLng,
    });
    markers.push(marker);
  }

    /*for(var i = 0; i < a; i++){

    displayPost(arr[i][0], arr[i][1]);
    }*/


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

