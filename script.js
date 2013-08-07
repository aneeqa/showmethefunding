
var map;

var myLatlng = new google.maps.LatLng(52.4508168, -1.930513499999961);

function initialize() {
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(55.378051, -3.43597299999999),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  animation: google.maps.Animation.DROP,
	  title: 'University of Birmingham.'
  });
  
  google.maps.event.addListener(marker, 'click', function() {
	  map.setZoom(8);
	  map.setCenter(marker.getPosition());
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
