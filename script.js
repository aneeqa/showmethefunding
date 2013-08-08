google.maps.visualRefresh = true;
var map;

function initialize() {
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(54.8,-9.9),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
   
   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  placeMarkers();
  }
  
   function placeMarkers() {
      $.getJSON(
          "Dummy_final_array.json",
          function(result) {
		  console.log(result);
		  $.each(result.establishments, function(key, val) {  
 	          var myLatLng = new google.maps.LatLng(val.Lat, val.Lng);
              var marker = new google.maps.Marker({
	              position: myLatLng,
	              map: map,
	              animation: google.maps.DROP,
	              title: val.research_institution
	           });
	        });
	      });
	      
	     
  google.maps.event.addListener(marker, 'click', function() {
	  map.setZoom(8);
	  map.setCenter(marker.getPosition());
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
  $('form').submit(function() {  
    $('#landing-slide').animate({"left":"80%"}, 1500);
  });
  $('#hide').click(function() {  
    $('#landing-slide').hide();
  });
});

$(function() {
  $('form').on('submit', function(e) {
      gMap = new google.maps.Map(document.getElementById('map-canvas')); 
      gMap.setZoom(7);      // This will trigger a zoom_changed on the map
      gMap.setCenter(new google.maps.LatLng(54.8,-2.3));
      gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      
      e.preventDefault();
    });
});