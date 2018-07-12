<?php
    //error_reporting(E_ALL ^ E_NOTICE);
	//获取
	$users = $_POST["user"];
	$password = $_POST["password"];
	//连接数据库
	header("content-type:text/html;charset=utf-8");
	$user = new PDO("mysql:host=localhost;dbname=user","root","root");
	$user->query("set names utf8");
	//查找
	$sql="select * from user";
	$rs=$user->query($sql);
	$arr=$rs->fetchAll(PDO::FETCH_ASSOC);
    $a=0;
    echo 1;
	foreach($arr as $key =>$val){
        
		if($val["name"]==$users && $val["password"]==$password){
            
            file_put_contents("data.txt",$users);
            //获取数据
           // $datas = unserialize(file_get_contents("data.txt"));
            // print_r($datas);
            header("Location: http://localhost/tianmao/");
			//break;
		}else{
			$a=$a+1;
			if($a==count($arr)){
			echo "登陆失败";
			file_put_contents("data.txt"," ");
			}	
		};
	};
	//执行语句
	//$user->exec($sql);
?>



