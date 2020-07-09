<?php

header('content-type:text/html;charset=utf-8');
//1 获取前端的用户和密码
$name = $_POST['username'];
$pw = $_POST['password'];
// echo $name;
//2 进行登录(通过数据库验证)
//2.1 链接数据库
$link = mysqli_connect('localhost','root','root','music');
//2.2 执行插入语句
$sql = "INSERT INTO `user` VALUES (null,'$name','$pw')";
$res = mysqli_query($link,$sql);

?>