<?php
include('db_util.php');
print("dbUtil_getAllLocations() : " . dbUtil_getAllLocations() . "<br>");
print("dbUtil_getAllReviews('ABC') : " . dbUtil_getAllReviews('ABC') . "<br>");
print("dbUtil_getAllReviews(1) : " . dbUtil_getAllReviews(1) . "<br>");
print("dbUtil_checkLogin('test','test') : " . dbUtil_checkLogin('test','test') . "<br>");
print("dbUtil_checkLogin('test','test1') : " . dbUtil_checkLogin('test','test1') . "<br>");
?>