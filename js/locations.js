$(document).ready(function()
{
	$(".add-location-button").click(function() {
		$(".locationsfield").remove();
		$(".login").load("../admin/add-location.html", function() {
			$.getScript("../js/add-location.js");
    	});

	});
	$.ajax
	({
		url: "../command_request.php?command=get_all_locations",
		type: "post",
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		if(data) {
			for (var i = 0; i <= data.length - 1 ; i++) {
				var id = data[i].id;
				var name = data[i].name;
				var lat = data[i].lat;
				var lng = data[i].lng;
				var description = data[i].description;
				$(".locations-table-show").append('<tr id="'+ id +'""><td>'+id
					+'</td><td id="name-"'+ id +'>'+name
					+'</td><td id="lat-"'+ id +'>'+lat
					+'</td><td id="lng-"'+ id +'>'+lng
					+'</td><td id="des-"'+ id +'>'+description
					+'</td><td class="row-console">'
					+'<input type="button" name="edit" id="'+ id +'" value="edit" class="edit-location-button blue btn btn-xs">'
					+'<input type="button" name="delete" id="'+ id +'" value="delete" class="delete-location-button red btn btn-xs">'
					+'</td></tr>'
				);
			}
			$.getScript("../js/locations-console.js");
		}
	});

});

