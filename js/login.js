$(document).ready(function()
{
	$(".login-button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		console.log(username);
		// $.ajax
		// ({
		// 	url: "",
		// 	type: "post",
		// 	data: 
		// 	{
		// 		'username': username,
		// 		'password': password
		// 	},
		// 	dataType: "json"
		// }).done(function(data) {
		// 	if(data) {
				$(".mdl-layout__header.is-casting-shadow").css("background-color", "black");
				$(".mdl-layout__tab-bar").css("background-color", "black");
    			//data.color
				$("#login-tab").text(username + "'s PROFILE");
				$("#locations-tab").removeClass("disabled");
				$("#reviews-tab").removeClass("disabled");
				$(".loginfield").remove();
				// $.get("../admin/profile.html",function(data){
    //             	$(".mdl-grid.login").append(data);
		  //   		$("#profile-username").text(username);
    //         	});
		    	$(".mdl-grid.login").load("../admin/profile.html", function() {
		    		$("#profile-username").text(username);
		    	});
		    	
		// 	}
		// });
	});
});