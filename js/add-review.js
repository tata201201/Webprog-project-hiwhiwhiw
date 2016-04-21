$(document).ready(function()
{
	console.log("add review load");
	$(".cancel-add-review-button").click(function() {
		$(".addlocationsfield").remove();
		$(".login").load("../admin/reviews.html", function() {
			$.getScript("../js/reviews.js");
    	});
	});
	$(".confirm-add-review-button").click(function() {
		console.log(userid);
		console.log($("#location-id").val());
		console.log(this.id);
		$.ajax
		({
			url: "../command_request.php?command=add_review",
			type: "post",
			data: 
			{
				'user_id': userid, 
				'location_id': $("#location-id").val(), 
				'star': $("#review-star").val(), 
				'description': $("#review-des").val()
			},
			dataType: "json"
		}).done(function(data) {
			$(".addlocationsfield").remove();
			$(".login").load("../admin/reviews.html", function() {
				$.getScript("../js/reviews.js");
	    	});
			$(".loginfield").remove();
			$(".tab-2").removeClass("selected");
			tabstate = 3;
			$(".tab-3").addClass("selected");
		}).fail(function() {
			console.log("fail add review");
		});
	});
});

