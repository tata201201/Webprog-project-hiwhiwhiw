$(document).ready(function()
{
	$(".login-button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		// var loginSuccess = ....;
		console.log(username);
		if(loginSuccess) {
			$("#login-tab").text(username + "'s PROFILE");
			$("#locations-tab").removeClass("disabled");
			$("#reviews-tab").removeClass("disabled");
			$(".loginfield").remove();
        	$(".mdl-grid .login").append("<li>Appended item</li>");
		}
		else {

		}
	});
});