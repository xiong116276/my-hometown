<?php
    header("Content-Type:application/json,charset=utf-8");
    $conn = mysqli_connect('127.0.0.1',' ',' ','bdm28760038_db',3306);

    $lname=$_REQUEST["lname"];
    $lcontact=$_REQUEST["lcontact"];
    $lcontent=$_REQUEST["lcontent"];
    date_default_timezone_set("Asia/Shanghai");
    $ltime = date("Y-m-d H:i:s");
    $output=array();
    if(empty($lcontent)){
        $output["msg"]="留言为空";
        echo json_encode($output);
    }else{

        $sql = "SET NAMES UTF8";
        mysqli_query($conn,$sql);

        $sql = "INSERT INTO leaveWordList VALUES(NULL,'$lname','$lcontact','$ltime','$lcontent')";
        $result = mysqli_query($conn,$sql);

        if(!$result){
            $output["msg"]="留言失败。。。";
        }else{
            $output["msg"]="留言成功";
        }

        echo json_encode($output);
    }
?>