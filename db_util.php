<?php
$db = null;
function dbUtil_connect(){
    global $db;
    $db = mysqli_connect("ap-cdbr-azure-southeast-b.cloudapp.net","bad7a8813d5b86","0a44f575","hiwhiwhiw");
    if(mysqli_connect_errno($db)){
        $db = null;
    }
    return isset($db);
}
function dbUtil_getAllLocations(){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "SELECT * FROM locations";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "name" => $row['name'], "description" => $row['description'], "lat" => $row['lat'], "lng" => $row['lng']);
            $counter++;
        }
        return json_encode($return_result);
    }
}
function dbUtil_getAllReviewsByLocation($location_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($location_id)) return false;
        $sql = "SELECT * FROM reviews WHERE location_id = '$location_id'";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "user_id" => $row['user_id'], "location_id" => $row['location_id'], "star" => $row['star'], "description" => $row['description']);
            $counter++;
        }
        return json_encode($return_result);
    }
}
function dbUtil_checkLogin($username, $password){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            $row = mysqli_fetch_array($result);
            return $row['id'];
        }
        return false;
    }
}
function dbUtil_getAllReviewsByUser($user_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($user_id)) return false;
        $sql = "SELECT * FROM reviews WHERE user_id = '$user_id'";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "user_id" => $row['user_id'], "location_id" => $row['location_id'], "star" => $row['star'], "description" => $row['description']);
            $counter++;
        }
        return json_encode($return_result);
    }
}
function dbUtil_getUserInfo($user_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($user_id)) return false;
        $sql = "SELECT * FROM users WHERE id = '$user_id'";
        $result = mysqli_query($db,$sql);
        $row = mysqli_fetch_array($result);
        $return_result = array("id" => $row['id'], "username" => $row['username'], "name" => $row['name'], "color" => $row['color']);
        return json_encode($return_result);
    }
}

?>