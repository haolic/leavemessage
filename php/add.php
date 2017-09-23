<?php
header("content-type:text/html;charset=utf-8");
$name = $_POST['name'];
$detail = $_POST['detail'];
$face = $_POST['face'];

include('conn.php');

$num = mysql_query("insert into visitorsbook (name, detail, face, porTime) value('$name', '$detail', '$face', now())");
if($num > 0) {
	echo '{"status": 1, "message": "发布成功"}';
} else {
	echo '{"status": 0, "message": "发布失败"}';
}
?>