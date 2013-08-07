var map;

function initialize() {
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(54.6, -1.3),
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
	      
	     
  //google.maps.event.addListener(marker, 'click', function() {
	  //map.setZoom(8);
	  //map.setCenter(marker.getPosition());
  //});
}

google.maps.event.addDomListener(window, 'load', initialize);
