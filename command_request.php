<?php
include("db_util.php");

if(isset($_GET)){
    if(isset($_GET['command'])){
        $cmd = $_GET['command'];
        if($cmd == "get_all_locations") print dbUtil_getAllLocations();
    }
}

?>