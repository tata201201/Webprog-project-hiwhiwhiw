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
function dbUtil_getAllLocations(&$qh){
    global $db;
    if(!dbUtil_connect()){
        return false;
    }else{
        $sql = "SELECT * FROM locations";
        $result = mysqli_query($db,$q);
        $return_result=array();
        $counter = 0;
        while($row = mysqli_fetch_array($result)){
            $return_result[$counter]=array("name" => $row['name'], "description" => $row['description'], "lat" => $row[lat], "lng" => $row['lng']);
            $counter++;
        }
        return json_encode($return_result);
    }
}
?>