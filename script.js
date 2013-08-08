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
	   
}

function createHTML(result) {
    HTMLtext = new Array();
	$.each(result.establishments, function(ndx, val) {
        var html = "<div id='content'><h2>";
        html += val.orgname;
        html += "</h2>";
        html += "<div class='proj-info'>";
        html += "<h3>";
        html += val.projects[0].title;
        html += "</h3>"
        html += "<table border='1'>";
        html += "<tr class='funds'>";
        html += "<td>";
        html += "<b>";
        html += "Amount";
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].amount;
        html += "</td>";
        html += "</tr>";
        html += "<tr class='funded by'>";
        html += "<td>";
        html += "<b>";
        html += "Funded By"
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].funder;
        html += "</td>";
        html += "</tr>";
        html += "<tr class='active'>";
        html += "<td>";
        html += "<b>";
        html += "Project Status";
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].status;
        html += "</td>";
        html += "</tr>";
        html += "<tr class='start-date'>";
        html += "<td>";
        html += "<b>";
        html += "Start Date";
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].start;
        html += "</td>"; 
        html += "</tr>";
        html += "<tr class='end-date'>";
        html += "<td>";
        html += "<b>";
        html += "End Date";
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].end;
        html += "</td>";
        html += "</tr>";
        html += "<tr class='abstract'>";
        html += "<td>";
        html += "<b>";
        html += "Abstract";
        html += "</b>";
        html += "</td>";
        html += "<td>";
        html += val.projects[0].abstract;
        html += "</td>";
        html += "</tr>";
        html += "</table>";
        html += "</div>";
        html += "</div>";
   		HTMLtext[ndx] = html;
    });
}
  
function placeMarkers(result) {     
	$.each(result.establishments, function(ndx, val) {
 	       var myLatLng = new google.maps.LatLng(val.Lat, val.Lng);
           var marker = new google.maps.Marker({
	           position: myLatLng,
	           map: map,
	           animation: google.maps.Animation.DROP,
	           title: val.orgname,
	           html: HTMLtext[ndx]
	        });
	        
	        var contentString = "Some content";
	        
	        google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(this.html);
				infowindow.open(map, this);
		    });
	});	      
}

//function infoWindows(result) {
//	 $.each(result.establishments, function(key, val) {
//		var contentString = 'Html Stuff.'
//		var infowindow = new.google.maps.InfoWindow({
//			content: contentString
//	   });
//	});	
//}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
    $('form').submit(function(e2) {
	    console.log("Working up to here");
	    e2.preventDefault();
        $('#landing-slide').animate({"left":"80%"}, 1500, function(){
		    $.getJSON(
            "Dummy_final_array.json",
             function(result) { 
		        createHTML(result);
		        placeMarkers(result);
		           infowindow = new google.maps.InfoWindow({
	                  content: "loading..."
		        
	         });
		});
    });
  $('#hide').click(function() {  
    $('#landing-slide').hide();
  });
});
});
