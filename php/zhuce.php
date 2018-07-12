<?php
	//获取
	$users = $_POST["user"];
	$password = $_POST["password"];
	//连接数据库
	header("content-type:text/html;charset=utf-8");
	$user = new PDO("mysql:host=localhost;dbname=user","root","root");
	$user->query("set names utf8");
	//增加
	$sql="insert into user(name,password) values('$users','$password')";
	//执行语句
	$user->exec($sql);
	echo "注册成功"
?>

