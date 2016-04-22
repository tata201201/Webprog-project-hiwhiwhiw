$(document).ready(function()
{
	console.log("review.js loaded");
	$(".add-review-button").click(function() {
		$(".reviewsfield").remove();
		$(".login").load("../admin/add-review.html", function() {
			$.getScript("../js/add-review.js");
    	});
	});
	$.ajax
	({
		url: "../command_request.php?command=get_all_reviews_by_user",
		type: "post",
		data: 
		{
			'user_id': userid
		},
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		if(data) {
			for (var i = 0; i <= data.length - 1 ; i++) {
				var reid = data[i].id;
				var location_id = data[i].location_id;
				var location_name = data[i].location_name;
				var star = data[i].star;
				var redescription = data[i].description;
				$(".reviews-table-show").append('<tr id="'+ reid +'""><td>'+reid
					+'</td><td id="location_id-"'+ reid +'>'+location_id
					+'</td><td id="location_name-"'+ reid +'>'+location_name
					+'</td><td id="star-"'+ reid +'>'+star
					+'</td><td id="des-"'+ reid +'>'+redescription
					+'</td><td class="row-console">'
					+'<input type="button" name="edit" id="'+ reid +'" value="edit" class="edit-review-button blue btn btn-xs">'
					+'<input type="button" name="delete" id="'+ reid +'" value="delete" class="delete-review-button red btn btn-xs">'
					+'</td></tr>'
				);
			}
			$.getScript("../js/reviews-console.js");
		}
	}).fail(function() {
		console.log("load review fail");
	});

});