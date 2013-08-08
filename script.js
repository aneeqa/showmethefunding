google.maps.visualRefresh = true;
var map;
var infowindow = null;
   
function initialize() {
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(53.709714,-3.826675),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
   
   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
   
  // infowindow = new google.maps.InfoWindow({
	//   content: "placeholder..."
  // });
	   

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
	              animation: google.maps.Animation.DROP,
	              title: val.research_institution
	           });
	        });
	      });
	      
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
  $('form').submit(function(e2) {
	  console.log("Working up to here");
	  e2.preventDefault();
    $('#landing-slide').animate({"left":"80%"}, 1500, function(){
		placeMarkers();
		});
  });
  $('#hide').click(function() {  
    $('#landing-slide').hide();
  });
});
