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
        html = "<div id='content'><h2>";
        html += val.orgname;
        html += "</h2>";
        html += "<div class='proj-info'>";
        html += "<table border='1'>";
        for(var i=0; i<val.projects.length; ++i) {
          html += "<tr><td colspan='2'><h3>";
          html += val.projects[i].title;
          html += "</h3></td></tr>";
          html += "<tr class='funds'>";
          html += "<td>";
          html += "<b>";
          html += "Amount";
          html += "</b>";
          html += "</td>";
          html += "<td>";
          html += val.projects[i].amount;
          html += "</td>";
          html += "</tr>";
          html += "<tr class='funded by'>";
          html += "<td>";
          html += "<b>";
          html += "Funded By"
          html += "</b>";
          html += "</td>";
          html += "<td>";
          html += val.projects[i].funder;
          html += "</td>";
          html += "</tr>";
          if (val.projects[i].status) {
            html += "<tr class='active'>";
            html += "<td>";
            html += "<b>";
            html += "Project Status";
            html += "</b>";
            html += "</td>";
            html += "<td>";
            html += val.projects[i].status;
            html += "</td>";
            html += "</tr>";
          }   
          html += "<tr class='start-date'>";
          html += "<td>";
          html += "<b>";
          html += "Start Date";
          html += "</b>";
          html += "</td>";
          html += "<td>";
          html += val.projects[i].start;
          html += "</td>"; 
          html += "</tr>";
          html += "<tr class='end-date'>";
          html += "<td>";
          html += "<b>";
          html += "End Date";
          html += "</b>";
          html += "</td>";
          html += "<td>";
          html += val.projects[i].end;
          html += "</td>";
          html += "</tr>";
          // html += "<tr class='abstract'>";
          // html += "<td>";
          // html += "<b>";
          // html += "Abstract";
          // html += "</b>";
          // html += "</td>";
          // html += "<td>";
          // html += val.projects[i].abstract;
          // html += "</td>";
          // html += "</tr>";
        }
        html += "</table>";
        html += "</div>";
        html += "</div>";
   		HTMLtext[ndx] = html;
    });
}
  
function placeMarkers(result) {     
	$.each(result.establishments, function(ndx, val) {
 	       var myLatLng = new google.maps.LatLng(val.lat, val.lng);
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

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
  $('#loading').hide();
    $('form').submit(function(e2) {
	    console.log("Working up to here");
	    e2.preventDefault();
          $('#loading').show();
        $('#landing-slide').animate({left:'80%'}, 1000,'easeOutBounce', function(){
         $('#landing-slide').animate({right:'80%'}, 1000,'easeOutBounce')
		    $.getJSON(
             "/cgi-bin/everything.py",
           {"term" : $('#input-text').val()},
             function(result) { 
              $('#loading').hide();
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
