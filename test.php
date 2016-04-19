<?php
include('db_util.php');
if(!dbUtil_connect()){
    print '<div class="alert alert-danger">Cannot connect to the Database</div>';
}else{
    $q = array();
    print dbUtil_formatResult($q);
}
?>