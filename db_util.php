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
function dbUtil_getAllPhotosFromReview($review_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($review_id)) return false;
        $sql = "SELECT * FROM photos WHERE review_id = '$review_id'";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "review_id" => $row['review_id'], "directory" => $row['directory'], "caption" => $row['caption']);
            $counter++;
        }
        return $return_result;
    }
}
function dbUtil_getAllReviewsByLocation($location_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($location_id)) return false;
        $sql = "SELECT reviews.id as id, name, location_id, star, description FROM reviews INNER JOIN users ON users.id = reviews.user_id WHERE location_id = '$location_id' ";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "user_name" => $row['name'], "location_id" => $row['location_id'], "star" => $row['star'], "description" => $row['description'], "photos" => dbUtil_getAllPhotosFromReview($row['id']));
            $counter++;
        }
        return json_encode($return_result);
    }
}
function dbUtil_checkLogin($username, $password){
    //echo "AAA";
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        //echo "BBB";
        $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            //echo "CCC";
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
        $sql = "SELECT reviews.id as id, user_id, location_id, name, star, reviews.description as description FROM reviews INNER JOIN locations ON locations.id = reviews.location_id WHERE user_id = '$user_id'";
        $result = mysqli_query($db,$sql);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("id" => $row['id'], "user_id" => $row['user_id'], "location_id" => $row['location_id'], "location_name" => $row['name'], "star" => $row['star'], "description" => $row['description'], "photos" => dbUtil_getAllPhotosFromReview($row['id']));
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
function dbUtil_changePassword($user_id, $old_password, $new_password){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($user_id)) return false;
        $sql = "SELECT * FROM users WHERE id = '$user_id' AND password = '$old_password'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            $sql = "UPDATE users SET password = '$new_password' WHERE id = '$user_id'";
            $result = mysqli_query($db,$sql);
            return true;
        }
        return false;
    }
}
function dbUtil_changeColor($user_id, $new_color){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        if(!is_numeric($user_id)) return false;
        $sql = "SELECT * FROM users WHERE id = '$user_id'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            $sql = "UPDATE users SET color = '$new_color' WHERE id = '$user_id'";
            $result = mysqli_query($db,$sql);
            return true;
        }
        return false;
    }
}
function dbUtil_addLocation($name, $lat, $lng, $description){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "INSERT INTO locations (name, lat, lng, description) VALUES ('$name','$lat','$lng','$description') ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM locations WHERE name = '$name' AND lat = '$lat' AND lng = '$lng' AND description = '$description'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            $row = mysqli_fetch_array($result);
            return $row['id'];
        }
        return false;
    }
}
function dbUtil_deleteLocation($location_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "DELETE FROM locations WHERE id = '$location_id' ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM locations WHERE id = '$location_id' ";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 0){
            return true;
        }
        return false;
    }
}
function dbUtil_editLocation($location_id, $name, $lat, $lng, $description){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "UPDATE locations SET name = '$name', lat = '$lat', lng = '$lng', description = '$description' WHERE id = '$location_id' ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM locations WHERE id = '$location_id' AND name = '$name' AND lat = '$lat' AND lng = '$lng' AND description = '$description'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            return true;
        }
        return false;
    }
}
function dbUtil_addReview($user_id, $location_id, $star, $description, $recv_photo){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "INSERT INTO reviews (user_id, location_id, star, description) VALUES ('$user_id','$location_id','$star','$description') ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM reviews WHERE user_id = '$user_id' AND location_id = '$location_id' AND star = '$star' AND description = '$description'";
        $result = mysqli_query($db,$sql);
        $photos = $recv_photo;
        if($result->num_rows == 1){
            $row = mysqli_fetch_array($result);
            //echo "<script>alert(" . count($photos) . ")</script>";
            $return_val = "";
            for($i=0;$i<count($photos);$i++){
                if($photos[i] == "") continue;
                $sql = "INSERT INTO photos (directory) VALUES ('$photos[i]')";
                $return_val += $sql;
                $result = mysqli_query($db,$sql);
            }
            return $row['id'] + count($photos);
        }
        return false;
    }
}
function dbUtil_deleteReview($review_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "DELETE FROM reviews WHERE id = '$review_id' ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM reviews WHERE id = '$review_id' ";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 0){
            return true;
        }
        return false;
    }
}
function dbUtil_editReview($review_id, $user_id, $location_id, $star, $description){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "UPDATE reviews SET user_id = '$user_id', location_id = '$location_id', star = '$star',description = '$description' WHERE id = '$review_id' ";
        $result = mysqli_query($db,$sql);
        $sql = "SELECT * FROM reviews WHERE id = '$review_id' AND user_id = '$user_id' AND location_id = '$location_id' AND star = '$star' AND description = '$description'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1){
            return true;
        }
        return false;
    }
}
function dbUtil_getLocationByID($location_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "SELECT * FROM locations WHERE id = '$location_id'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1) {
            $row = mysqli_fetch_array($result);
            $return_result = array("id" => $row['id'], "name" => $row['name'], "description" => $row['description'], "lat" => $row['lat'], "lng" => $row['lng']);
            return json_encode($return_result);
        }else{
            return false;
        }
    }
}
function dbUtil_getReviewByID($review_id){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "SELECT * FROM reviews INNER JOIN locations ON locations.id = reviews.location_id WHERE reviews.id = '$review_id'";
        $result = mysqli_query($db,$sql);
        if($result->num_rows == 1) {
            $row = mysqli_fetch_array($result);
            $return_result = array("id" => $row['id'], "user_id" => $row['user_id'], "location_id" => $row['location_id'], "location_name" => $row['name'], "star" => $row['star'], "description" => $row['description'], "photos" => dbUtil_getAllPhotosFromReview($row['id']));
            return json_encode($return_result);
        }else{
            return false;
        }
    }
}
?>