<?php

header('content-type:text/html;charset=utf-8');
//1 获取前端的用户和密码
$name = $_POST['username'];
$pw = $_POST['password'];
//2 进行登录(通过数据库验证)
//2.1 链接数据库
$link = mysqli_connect('localhost','root','root','music');
//2.2 执行插入语句
$sql = "SELECT * FROM `user` WHERE `username`='$name' AND `password`='$pw'";
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
if($row){
    // setcookie('name',$name);//会话时效
    // setcookie('name','张三');
    // setcookie('name',$name,time()+7*24*60*60);//时效是7天
    echo json_encode(array("code"=>1,"name"=>$name));
}else{
    echo json_encode(array("code"=>0));
}
?>