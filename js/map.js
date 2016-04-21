// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    });
  } else {
    // Browser doesn't support Geolocation
  }

  $.ajax({
    url: "command_request.php?command=get_all_locations",
    type: "get",
    dataType: "json",
    success: function(data){
      display(data, map);
    }
  });
}

function display(result, map){
  console.log(result);
  var marker = [];
  for (var i = 0; i < result.length; i++) {
    console.log({lat:parseFloat(result[i].lat), lng:parseFloat(result[i].lng)});
    marker[i] = new google.maps.Marker({
      position: {lat:parseFloat(result[i].lat), lng:parseFloat(result[i].lng)},
      map: map,
      value: result[i]
    });
    console.log(marker.length);
    marker[i].addListener('click', function() {
      //map.setZoom(8);
      map.setCenter(this.getPosition());
      display_review(this.value);
      $('#review').css("right","0px");
      $("#review_details").empty();
      $("#review_details").html("<div style='text-align:center;'><img src='site_image/loading.gif'/><br/><br/>Loading...</div>");
    });
    //addMarkerWithTimeout({lat:result[i].lat, lng:result[i].lng}, i * 200);
  }

}

function display_review(location){
  console.log(location);
  $.ajax({
    url: "command_request.php?command=get_all_reviews_by_location",
    data: {location_id: location.id},
    type: "post",
    dataType: "json",
    success: function(data){
      console.log(data);
      display_review_pane(location, data);
    }
  });
}

function display_review_pane(location, reviews){
  console.log(location);
  console.log(reviews);
  $("#location").empty();
  $("#review_details").empty();
  var show_location = "";
  var show_reviews="";

  show_location = show_location+"<div id='location_name'>"+location.name+"</div>";
  show_location = show_location+"<div id='location_latlng'>"+"Lat:"+location.lat+" Lng:"+location.lng+"</div>";
  show_location = show_location+"<div id='location_description'>"+"<h1>Description:</h1>"+location.description+"</div>";
  $(show_location).appendTo("#location");


  for(var i = 0;i<reviews.length;i++){
    show_reviews = show_reviews+"<h1>Review:</h1><div id='review_user'> <b>By: "+reviews[i].user_name+"</b></div>";
    show_reviews = show_reviews+"<div id='review_star'> Star:"+"<div class='progress'>"+
    "<div class='progress-bar' role='progressbar' aria-valuenow='3' aria-valuemin='0' aria-valuemax='5' style='width:"+(reviews[i].star*20)+"%'>"+
    "</div></div></div>";
    show_reviews = show_reviews+"<div id='review_description'> Review: <br>"+reviews[i].description+"</div>";
    $(show_reviews).appendTo("#review_details");
  }


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function close_review(){
  $('#review').css("right","-400px");
}

$(document).ready(function(){
    $("#title").click(close_review);
});
