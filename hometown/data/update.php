<?php
    header("Content-Type:application/json,charset=utf-8");

    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);

    $nid=$_REQUEST["nid"];
    $href=$_REQUEST["href"];
    $title=$_REQUEST["title"];
    $ntime=$_REQUEST["ntime"];
    date_default_timezone_set("Asia/Shanghai");
    $uptime = date("Y-m-d H:i:s");
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $sql="UPDATE newsList SET href='$href',title='$title',ntime='$ntime',uptime='$uptime' where nid='$nid'";
    $result=mysqli_query($conn,$sql);

    $output = array();
    if(!$result){
        $output["msg"]="Sorry,修改失败。。。";
    }else{
        $output["msg"]="修改成功";
    }

    echo json_encode($output);
?>