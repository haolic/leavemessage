<?php

header("content-type:text/html;charset=utf-8");
include('conn.php');
$rs = mysql_query("select * from visitorsbook order by porTime desc");

$str = '{"status": 1, "message": "success", "data": [';
while ($arr = mysql_fetch_array($rs)) {
	$str .= '{"name":"' . $arr['name'] . '"';
	$str .= ',"face":"' . $arr['face'] . '"';
	$str .= ',"detail":"' . $arr['detail'] . '"';
	$str .= ',"adminName":"' . $arr['adminName'] . '"';
	$str .= ',"userFace":"' . $arr['userFace'] . '"';
	$str .= ',"reply":"' . $arr['reply'] . '"';
	$str .= ',"porTime":"' . $arr['porTime'] . '"},';
};
$str = substr($str, 0, strlen($str) - 1);

echo $str . ']}';

?>