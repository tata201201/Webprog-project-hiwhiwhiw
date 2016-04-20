<?php
include("db_util.php");

if(isset($_GET)){
    if(isset($_GET['command'])){
        $cmd = $_GET['command'];
        if($cmd == "get_all_locations") print dbUtil_getAllLocations();
        else if($cmd == "get_all_reviews_by_location"){
            if(isset($_REQUEST['location_id'])){
                print dbUtil_getAllReviewsByLocation($_REQUEST['location_id']);
            }
        }else if($cmd == "check_login"){
            if(isset($_REQUEST['username']) && isset($_REQUEST['password'])){
                //echo "[".$_REQUEST['username']."][".$_REQUEST['password']."]";
                print dbUtil_checkLogin($_REQUEST['username'],$_REQUEST['password']);
            }
        }else if($cmd == "get_all_reviews_by_user"){
            if(isset($_REQUEST['user_id'])){
                print dbUtil_getAllReviewsByUser($_REQUEST['user_id']);
            }
        }else if($cmd == "get_user_info"){
            if(isset($_REQUEST['user_id'])){
                print dbUtil_getUserInfo($_REQUEST['user_id']);
            }
        }else if($cmd == "change_password"){
            if(isset($_REQUEST['user_id']) && isset($_REQUEST['old_password']) && isset($_REQUEST['new_password'])){
                print dbUtil_changePassword($_REQUEST['user_id'], $_REQUEST['old_password'], $_REQUEST['new_password']);
            }
        }else if($cmd == "change_color"){
            if(isset($_REQUEST['user_id']) && isset($_REQUEST['color'])){
                print dbUtil_changeColor($_REQUEST['user_id'], $_REQUEST['color']);
            }
        }else if($cmd == "add_location"){
            if(isset($_REQUEST['name']) && isset($_REQUEST['lat']) && isset($_REQUEST['lng']) && isset($_REQUEST['description'])){
                print dbUtil_addLocation($_REQUEST['name'], $_REQUEST['lat'], $_REQUEST['lng'], $_REQUEST['description']);
            }
        }else if($cmd == "delete_location"){
            if(isset($_REQUEST['location_id'])){
                print dbUtil_deleteLocation($_REQUEST['location_id']);
            }
        }else if($cmd == "add_review"){
            if(isset($_REQUEST['user_id']) && isset($_REQUEST['location_id']) && isset($_REQUEST['star']) && isset($_REQUEST['description'])){
                print dbUtil_addReview($_REQUEST['user_id'], $_REQUEST['location_id'], $_REQUEST['star'], $_REQUEST['description']);
            }
        }else if($cmd == "delete_review"){
            if(isset($_REQUEST['review_id'])){
                print dbUtil_deleteReview($_REQUEST['review_id']);
            }
        }
    }
}
/*
command_request.php?command=
get_all_locations
check_login | POST ( username, password ) | RETURN ID (done) or FALSE (fail)
get_all_reviews_by_user | POST ( user_id )
get_user_info | POST ( user_id )
change_password | POST ( user_id , old_password , new_password ) | RETURN TRUE (done) or FALSE (fail)
change_color | POST ( user_id , color ) | RETURN TRUE (done) or FALSE (fail)
add_location | POST ( name , lat , lng , description ) | RETURN ID (done) or FALSE (fail)
delete_location | POST ( location_id ) | RETURN TRUE (done) or FALSE (fail)
add_review | POST ( user_id , location_id , star , description ) | RETURN ID (done) or FALSE (fail)
delete_review | POST ( review_id ) | RETURN TRUE (done) or FALSE (fail)
 */
?>