var usercolor;
var tabstate = 0;
var username;
var userid;
$(document).ready(function()
{
	$("input.login-input").keypress(function(event){
	    if(event.keyCode == 13) {
        	event.preventDefault();
	    	console.log("enter");
	    	login();
	    }
	});
	$(".login-button").click(function() {
		login();
	});
	$("#login-tab").click(function() {
		if(tabstate == 3) {
			$(".reviewsfield").remove();
			$(".tab-3").removeClass("selected");
		} else if(tabstate == 2) {
			$(".loginfield").remove();
			$(".tab-2").removeClass("selected");
		}
		$(".login").load("../admin/profile.html", function() {
    		$("#profile-username").text(username);
    		$("#profile-username").css("color", usercolor);
    	});
		tabstate = 1;
				console.log("state= " + tabstate);
		$(".tab-1").addClass("selected");
		$.getScript("../js/profile.js");
	});
	$("#locations-tab").click(function() {
		if(tabstate == 1) {
			$(".profilefield").remove();
			$(".tab-1").removeClass("selected");
		} else if(tabstate == 3) {
			$(".reviewsfield").remove();
			$(".tab-3").removeClass("selected");
		}
		$(".login").load("../admin/locations.html", function() {
			$.getScript("../js/locations.js");	
    	});
		tabstate = 2;
		console.log("state= " + tabstate);
		$(".tab-2").addClass("selected");
	});
	$("#reviews-tab").click(function() {
		if(tabstate == 1) {
			$(".profilefield").remove();
			$(".tab-1").removeClass("selected");

		} else if(tabstate == 2) {
			$(".loginfield").remove();
			$(".tab-2").removeClass("selected");
		}
		$(".login").load("../admin/reviews.html", function() {
			$.getScript("../js/reviews.js");		
    	});
		tabstate = 3;
		console.log("state= " + tabstate);
		$(".tab-3").addClass("selected");
	});

	//change password
	$(".changepassword-button").click(function() {
		if( $("#newpassword").val() == $("#renewpassword").val() ) {
			changePassword($("#oldpassword").val(), $("#renewpassword").val());
		}
		else {
			$(".error").removeAttr("style");
			$(".error").html("Password confirmation doesn't match Password.");
			$(".passwordfield > input").val('');
		}
	});

	//change color
	$(".changecolor-button").click(function() {
		console.log("changecolor");
		if( $("#color").val() ) {
			changeColor( $("#color").val() );
		}
		else {
			$(".colorerror").removeAttr("style");
			$(".colorerror").html("Color is not in correct format.");
		}
	});
});

function login() {
	username = $("#username").val();
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
		userid = data;
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
				tabstate = 1;
				console.log("state= " + tabstate);
				usercolor = data.color;
				$(".layout__header").css("background-color", usercolor);
				console.log(data);
				console.log(data.color);
				$("#login-tab").text(username + "'s PROFILE");
				$("#locations-tab").removeClass("disabled");
				$("#reviews-tab").removeClass("disabled");
				$("#margin-left").removeClass("col-xs-4");
				$("#margin-left").addClass("col-xs-2");
				$(".login").removeClass("col-xs-4");
				$(".login").addClass("col-xs-8");
				$(".loginfield").remove();
		    	$(".login").load("../admin/profile.html", function() {
		    		$("#profile-username").text(username);
		    		$("#profile-username").css("color", usercolor);
		    		$.getScript("../js/profile.js");
		    	});
		    	$(".disabled").addClass("is-active");
		    	$(".disabled").removeClass("disabled");

			});
	    	// $("#fixed-tab-2 > .page-content").load("../admin/locations.html", function() {
	    	// 	// $("#profile-username").text(username);
	    	// });
	    	// $("#fixed-tab-3 > .page-content").load("../admin/reviews.html", function() {
	    	// 	// $("#profile-username").text(username);
	    	// });

		} 
		// else {
		// 	console.log("error");
		// 	$(".loginfield").prepend("<p class='error'>Incorrect username or password !</p>");
		// 	$(".error").css("color", red);
		// }
	});
}

function changePassword(oldpassword, renewpassword) {
	console.log("changePass");
	console.log(oldpassword);
	console.log(renewpassword);
	console.log(userid);
	$.ajax
	({
		url: "../command_request.php?command=change_password",
		type: "post",
		data: 
		{
			'user_id': userid,
			'old_password': oldpassword,
			'new_password': renewpassword
		},
		dataType: "json"
	}).done(function(data) {
		$(".error").removeAttr("style");
		$(".error").css("color", "#76EEC6");
		$(".error").html("Change password success.");
		$(".passwordfield > input").val('');
	}).fail(function() {
		console.log("false");
		$(".error").removeAttr("style");
		$(".error").css("color", "red");
		$(".error").html("Password is not correct.");
		$(".passwordfield > input").val('');

	});
}

function changeColor(color) {
	$.ajax
	({
		url: "../command_request.php?command=change_color",
		type: "post",
		data: 
		{
			'user_id': userid,
			'color': color
		},
		dataType: "json"
	}).done(function(data) {
		usercolor = color;
		$(".colorerror").removeAttr("style");
		$(".colorerror").css("color", "#76EEC6");
		$(".colorerror").html("Change color success.");
		$(".layout__header").css("background-color", usercolor);
    	$("#profile-username").css("color", usercolor);
	}).fail(function() {
		console.log("false");
		$(".colorerror").removeAttr("style");
		$(".colorerror").css("color", "red");
		$(".colorerror").html("Color is not in correct format.");
	});
}