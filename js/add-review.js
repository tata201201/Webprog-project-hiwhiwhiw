var p_id = 1;
var photo = [];
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
		for(var i = 1; i <= p_id; i++) {
			console.log($("#review-photo-"+i).val());
			photo.push($("#review-photo-"+i).val());
		}
		console.log(photo);
		$.ajax
		({
			url: "../command_request.php?command=add_review",
			type: "post",
			data: 
			{
				'user_id': userid, 
				'location_id': $("#location-id").val(), 
				'star': $("#review-star").val(), 
				'description': $("#review-des").val()//,
				//'photos': photo
			},
			dataType: "json"
		}).done(function(data) {
			console.log(data);
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
	$(".add-photo-button").click(function() {
		p_id++;
		$(".photo-input").append('<div class="textfield">'+
			'<input class="add-photo-review-input input" type="text" id="review-photo-'+ p_id +'" name="review-photo" required>'+
			'<label for="review-lng">Photo'+"'"+'s URL</label>'+
			'</div>'
		);
	});
});

