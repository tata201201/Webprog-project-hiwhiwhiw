var lo_id;
$(document).ready(function()
{
	console.log("reviews-console load");
	$(".edit-review-button").click(function() {
		$.ajax
		({
			url: "../command_request.php?command=get_review_by_id",
			type: "post",
			data: 
			{
				'review_id': this.id
			},
			dataType: "json"
		}).done(function(data) {
			$(".reviewsfield").remove();
			$(".login").load("../admin/edit-review.html", function() {
				console.log("id= "+data.id+"  loid= "+data.location_id);
				// $("#review-id").val(data.id);
				lo_id = data.location_id;
				$("#review-id").val(data.id);
				$("p").html("Location's id: "+"<br/>"+data.location_id);
				$("h5").html("Location's name: "+"<br/>"+data.location_name);
				$("#review-star").val(data.star);
				$("#review-des").val(data.description);
				$.getScript("../js/edit-review.js");
	    	});
		}).fail(function() {
			console.log("fail edit");
		});
	});
	$(".delete-review-button").click(function() {
		$.ajax
		({
			url: "../command_request.php?command=delete_review",
			type: "post",
			data: 
			{
				'review_id': this.id
			},
			dataType: "json"
		}).done(function(data) {
			$(".reviewsfield").remove();
			$(".login").load("../admin/reviews.html", function() {
				$.getScript("../js/reviews.js");
	    	});
		}).fail(function() {
			console.log("fail delete");
		});
	});
});

