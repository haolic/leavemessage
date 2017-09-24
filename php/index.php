<?php

header("content-type:text/html;charset=utf-8");
$pagenum = $_GET['pagenum'];
include('conn.php');
if (empty($pagenum)) {
	$pagenum = 1;
}
$rs = mysql_query("select * from visitorsbook order by porTime desc");
$num = ceil(mysql_num_rows($rs)/8);//总页数
mysql_data_seek($rs, ($pagenum - 1) * 8);
$str = '{"status": 1, "message": "success", "data": [';
for ($i = 1; $i <= 8; $i ++) {
	if ($arr = mysql_fetch_array($rs)) {
		$str .= '{"name":"' . $arr['name'] . '"';
		$str .= ',"face":"' . $arr['face'] . '"';
		$str .= ',"detail":"' . $arr['detail'] . '"';
		$str .= ',"adminName":"' . $arr['adminName'] . '"';
		$str .= ',"userFace":"' . $arr['userFace'] . '"';
		$str .= ',"reply":"' . $arr['reply'] . '"';
		$str .= ',"porTime":"' . $arr['porTime'] . '"';
		$str .= ',"userId":"' . $arr['userId'] . '"';
		$str .= ',"pagenum":"' . $num . '"},';
	};
};
$str = substr($str, 0, strlen($str) - 1);

echo $str . ']}';

?>