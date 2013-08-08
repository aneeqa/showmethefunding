google.maps.visualRefresh = true;
var map;
   
function initialize() {
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(53.709714,-3.826675),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
   
   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
	   
  }
  
  
  
function placeMarkers(result) {     
	$.each(result.establishments, function(key, val) {
 	       var myLatLng = new google.maps.LatLng(val.Lat, val.Lng);
           var marker = new google.maps.Marker({
	           position: myLatLng,
	           map: map,
	           animation: google.maps.Animation.DROP,
	           title: val.orgname
	        });
	 });
	      
}

//function infoWindows(result) {
	//$.each(result.


google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
    $('form').submit(function(e2) {
	    console.log("Working up to here");
	    e2.preventDefault();
        $('#landing-slide').animate({"left":"80%"}, 1500, function(){
		    $.getJSON(
            "Dummy_final_array.json",
             function(result) { 
		        placeMarkers(result);
		        
	         });
		});
    });
  $('#hide').click(function() {  
    $('#landing-slide').hide();
  });
});
