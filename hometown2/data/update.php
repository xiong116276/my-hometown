<?php
    header("Content-Type:application/json,charset=utf-8");

    $conn = mysqli_connect('bdm28760038.my3w.com','bdm28760038','aa116276','bdm28760038_db',3306);

    $admin=$_REQUEST["admin"];
    $nid=$_REQUEST["nid"];
    $href=$_REQUEST["href"];
    $title=$_REQUEST["title"];
    $ntime=$_REQUEST["ntime"];
    date_default_timezone_set("Asia/Shanghai");
    $uptime = date("Y-m-d H:i:s");
    $output = array();

    if(!empty($admin)){
        $sql="SET NAMES UTF8";
        mysqli_query($conn,$sql);

        $sql="UPDATE newsList SET  admin='$admin',href='$href',title='$title',ntime='$ntime',uptime='$uptime' where nid='$nid'";
        $result=mysqli_query($conn,$sql);

        if(!$result){
            $output["msg"]="Sorry,修改失败。。。";
        }else{
            $output["msg"]="修改成功";
        }
    }else{
        $output["msg"]="没有权限！";
    }

    echo json_encode($output);
?>