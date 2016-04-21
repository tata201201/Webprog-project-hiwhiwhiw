$(document).ready(function()
{
	console.log("add locations load");
	$(".cancel-add-location-button").click(function() {
		$(".addlocationsfield").remove();
		$(".login").load("../admin/locations.html", function() {
			$.getScript("../js/locations.js");
    	});
	});
	$(".confirm-add-location-button").click(function() {
		$.ajax
		({
			url: "../command_request.php?command=add_location",
			type: "post",
			data: 
			{
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
			console.log("fail addlocation");
		});
	});
});

