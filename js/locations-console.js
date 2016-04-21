$(document).ready(function()
{
	console.log("locations-console load");
	$(".add-review-location-button").click(function() {
		var lo_id = this.id;
		$(".reviewsfield").remove();
		$(".login").load("../admin/add-review.html", function() {
			$("#location-id").val(lo_id);
			$.getScript("../js/add-review.js");
    	});
	});
	$(".edit-location-button").click(function() {
		$.ajax
		({
			url: "../command_request.php?command=get_location_by_id",
			type: "post",
			data: 
			{
				'location_id': this.id
			},
			dataType: "json"
		}).done(function(data) {
			$(".locationsfield").remove();
			$(".login").load("../admin/edit-location.html", function() {
				console.log("id= "+data.id);
				$("#location-id").val(data.id);
				$("#location-name").val(data.name);
				$("#location-lat").val(data.lat);
				$("#location-lng").val(data.lng);
				$("#location-des").val(data.description);
				$.getScript("../js/edit-location.js");
	    	});
		}).fail(function() {
			console.log("fail edit");
		});

		
	});
	$(".delete-location-button").click(function() {
		$.ajax
		({
			url: "../command_request.php?command=delete_location",
			type: "post",
			data: 
			{
				'location_id': this.id
			},
			dataType: "json"
		}).done(function(data) {
			$(".locationsfield").remove();
			$(".login").load("../admin/locations.html", function() {
				$.getScript("../js/locations.js");
	    	});
		}).fail(function() {
			console.log("fail delete");
		});
	});
});

