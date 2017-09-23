<?php
header("content-type:text/html;charset=utf-8");

$userId = $_GET['userId'];
include("conn.php");

mysql_query("delete from visitorsbook where userId='$userId'");

$num = mysql_affected_rows();
if($num > 0) {
	echo '{"status": 1, "message": "删除成功"}';
} else {
	echo '{"status": 0, "message": "失败"}';
}
?>