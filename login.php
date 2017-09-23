<?php

header("content-type:text/html;charset=utf-8");
$name = $_GET['name'];
$pwd = $_GET['pwd'];
include('conn.php');
$rs = mysql_query("select * from userid where adminName='$name' and pwd='$pwd'");
$num = mysql_num_rows($rs);
if($num > 0) {
	
	$arr = mysql_fetch_array($rs);
	echo '{"status": 1, "message": "success","data":[{"name":"'.$arr['adminName'].'", "face":"'.$arr['face'].'"}]}';
}else{
	echo '{"status": 0, "message": "用户名或密码错误"}';
}
?>