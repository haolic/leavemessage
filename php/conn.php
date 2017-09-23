<?php
$conn = @mysql_connect("localhost", "root", "") or die("DB Connect Error!");
mysql_select_db("leave", $conn);
mysql_query("set names utf8");
?>