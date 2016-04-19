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
        }
    }
}

?>