$(document).ready(function()
{
	$("input").keyup(function(event){
	    if(event.keyCode == 13){
	    	login();
	    }
	});
	$(".login-button").click(function() {
		login();
	});
});

function login() {
	console.log("login");
	var username = $("#username").val();
		var password = $("#password").val();
		console.log(username);
		$.ajax
		({
			url: "../command_request.php?command=check_login",
			type: "post",
			data: 
			{
				'username': username,
				'password': password
			},
			dataType: "json"
		}).done(function(data) {
			if(data) {
				$.ajax
				({
					url: "../command_request.php?command=get_user_info",
					type: "post",
					data: 
					{
						'user_id': data
					},
					dataType: "json"
				}).done(function(data) {
					$(".layout__header").css("background-color", data.color);
					console.log(data);
					console.log(data.color);
				});
				$("#login-tab").text(username + "'s PROFILE");
				$("#locations-tab").removeClass("disabled");
				$("#reviews-tab").removeClass("disabled");
				$(".loginfield").remove();
				// $.get("../admin/profile.html",function(data){
    //             	$(".mdl-grid.login").append(data);
		  //   		$("#profile-username").text(username);
    //         	});
		    	$(".login").load("../admin/profile.html", function() {
		    		$("#profile-username").text(username);
		    	});
		    	$("#fixed-tab-2 > .page-content").load("../admin/locations.html", function() {
		    		// $("#profile-username").text(username);
		    	});
		    	$("#fixed-tab-3 > .page-content").load("../admin/reviews.html", function() {
		    		// $("#profile-username").text(username);
		    	});

			}
		});
}