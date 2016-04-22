$(document).ready(function()
{
	$("input.color-input").keypress(function(event){
	    if(event.keyCode == 13) {
        	event.preventDefault();
	    	console.log("enter");
	    	if( $("#color").val() ) {
				changeColor( $("#color").val() );
			}
			else {
				$(".colorerror").removeAttr("style");
				$(".colorerror").html("Color is not in correct format.");
			}
	    }
	});

	$("input.password-input").keypress(function(event){
	    if(event.keyCode == 13) {
        	event.preventDefault();
	    	console.log("enter");
	    	if( $("#newpassword").val() == $("#renewpassword").val() ) {
				changePassword($("#oldpassword").val(), $("#renewpassword").val());
			}
			else {
				$(".error").removeAttr("style");
				$(".error").html("Password confirmation doesn't match Password.");
				$(".passwordfield > input").val('');
			}
	    }
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