<?php
header("content-type:text/html;charset=utf-8");
$adminName = $_POST['adminName'];
$replyText = $_POST['replyText'];
$userId = $_POST['userId'];
include("conn.php");
$num = mysql_query("update visitorsbook set adminName='$adminName',reply='$replyText' where userId='$userId'");
if($num > 0) {
	echo '{"status": 1, "msg": "success"}';
} else {
	echo '{"status": 0, "msg": "失败"}';
}
?>