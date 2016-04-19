<?php
include('db_util.php');
print("dbUtil_getAllLocations() : " . dbUtil_getAllLocations() . "<br>");
print("dbUtil_getAllReviewsByLocation('ABC') : " . dbUtil_getAllReviewsByLocation('ABC') . "<br>");
print("dbUtil_getAllReviewsByLocation(1) : " . dbUtil_getAllReviewsByLocation(1) . "<br>");
print("dbUtil_checkLogin('test','test') : " . dbUtil_checkLogin('test','test') . "<br>");
print("dbUtil_checkLogin('test','test1') : " . dbUtil_checkLogin('test','test1') . "<br>");
print("dbUtil_getAllReviewsByUser('ABC') : " . sbUtil_getAllReviewsByUser('ABC') . "<br>");
print("dbUtil_getAllReviewsByUser(1) : " . sbUtil_getAllReviewsByUser(1) . "<br>");
print("dbUtil_getUserInfo('ABC') : " . sbUtil_getUserInfo('ABC') . "<br>");
print("dbUtil_getUserInfo(1) : " . sbUtil_getUserInfo(1) . "<br>");
?>