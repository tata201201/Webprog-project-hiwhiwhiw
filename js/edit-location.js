$(document).ready(function()
{
	console.log("edit locations load");
	console.log("location-id= "+ $("#location-id").val());
	$(".cancel-edit-location-button").click(function() {
		$(".addlocationsfield").remove();
		$(".login").load("../admin/locations.html", function() {
			$.getScript("../js/locations.js");
    	});
	});
	$(".confirm-edit-location-button").click(function() {
		console.log($("#location-id").val());
		console.log($("#location-name").val());
		console.log($("#location-lat").val());
		console.log($("#location-lng").val());
		console.log($("#location-des").val());
		$.ajax
		({
			url: "../command_request.php?command=edit_location",
			type: "post",
			data: 
			{
				'location_id': $("#location-id").val(),
				'name': $("#location-name").val(),
				'lat': $("#location-lat").val(),
				'lng': $("#location-lng").val(),
				'description': $("#location-des").val(),
			},
			dataType: "json"
		}).done(function(data) {
			$(".addlocationsfield").remove();
			$(".login").load("../admin/locations.html", function() {
				$.getScript("../js/locations.js");
	    	});
		}).fail(function() {
			console.log("fail editlocation");
		});
	});
});

