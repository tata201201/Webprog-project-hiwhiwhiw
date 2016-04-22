$(document).ready(function()
{
	console.log("edit review load");
	$(".cancel-edit-review-button").click(function() {
		$(".addlocationsfield").remove();
		$(".login").load("../admin/reviews.html", function() {
			$.getScript("../js/reviews.js");
    	});
	});
	$(".confirm-edit-review-button").click(function() {
		console.log(userid);
		console.log(lo_id);
		console.log(this.id);
		$.ajax
		({
			url: "../command_request.php?command=edit_review",
			type: "post",
			data: 
			{
				'review_id': $("#review-id").val(),
				'user_id': userid, 
				'location_id': lo_id, 
				'star': $("#review-star").val(), 
				'description': $("#review-des").val()
			},
			dataType: "json"
		}).done(function(data) {
			$(".addlocationsfield").remove();
			$(".login").load("../admin/reviews.html", function() {
				$.getScript("../js/reviews.js");
	    	});
		}).fail(function() {
			console.log("fail editlocation");
		});
	});
});

