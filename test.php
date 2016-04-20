<?php
include("db_util.php");
print("dbUtil_getAllLocations() : " . dbUtil_getAllLocations() . "<br>");
print("dbUtil_getAllReviewsByLocation('ABC') : " . dbUtil_getAllReviewsByLocation('ABC') . "<br>");
print("dbUtil_getAllReviewsByLocation(1) : " . dbUtil_getAllReviewsByLocation(1) . "<br>");
print("dbUtil_checkLogin('test','test') : " . dbUtil_checkLogin('test','test') . "<br>");
print("dbUtil_checkLogin('test','test1') : " . dbUtil_checkLogin('test','test1') . "<br>");
print("dbUtil_getAllReviewsByUser('ABC') : " . dbUtil_getAllReviewsByUser('ABC') . "<br>");
print("dbUtil_getAllReviewsByUser(1) : " . dbUtil_getAllReviewsByUser(1) . "<br>");
print("dbUtil_getUserInfo('ABC') : " . dbUtil_getUserInfo('ABC') . "<br>");
print("dbUtil_getUserInfo(1) : " . dbUtil_getUserInfo(1) . "<br>");
print("dbUtil_changePassword(1,'a','b') : " . dbUtil_changePassword(1,'a','b') . "<br>");
print("dbUtil_changePassword(1,'test','test1') : " . dbUtil_changePassword(1,'test','test1') . "<br>");
print("dbUtil_checkLogin('test','test') : " . dbUtil_checkLogin('test','test') . "<br>");
print("dbUtil_checkLogin('test','test1') : " . dbUtil_checkLogin('test','test1') . "<br>");
print("dbUtil_changePassword(1,'test1','test') : " . dbUtil_changePassword(1,'test1','test') . "<br>");
print("dbUtil_checkLogin('test','test') : " . dbUtil_checkLogin('test','test') . "<br>");
print("dbUtil_checkLogin('test','test1') : " . dbUtil_checkLogin('test','test1') . "<br>");
print("dbUtil_changeColor(1,'blue') : " . dbUtil_changeColor(1,'blue') . "<br>");
print("dbUtil_getUserInfo(1) : " . dbUtil_getUserInfo(1) . "<br>");
print("dbUtil_changeColor(1,'red') : " . dbUtil_changeColor(1,'red') . "<br>");
print("dbUtil_getUserInfo(1) : " . dbUtil_getUserInfo(1) . "<br>");
$insertResult = dbUtil_addLocation('locA',3.14,5.14,'descA');
print("dbUtil_addLocation('locA',3.14,5.14,'descA') : " . $insertResult . "<br>");
print("dbUtil_deleteLocation($insertResult) : " . dbUtil_deleteLocation($insertResult) . "<br>");
$insertResult = dbUtil_addLocation(1,1,5.14,'descA');
print("dbUtil_addReview(1,1,5.14,'descA') : " . $insertResult . "<br>");
print("dbUtil_deleteReview($insertResult) : " . dbUtil_deleteReview($insertResult) . "<br>");

?>