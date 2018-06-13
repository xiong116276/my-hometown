<?php
    header("Content-Type:application/json,charset=utf-8");
    $conn = mysqli_connect('127.0.0.1',' ',' ','bdm28760038_db',3306);

    $aname=$_REQUEST["aname"];
    $apassword=$_REQUEST["apassword"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output=array();

    $sql = "SELECT apassword FROM account where aname='$aname'";
    $result = mysqli_query($conn,$sql);

    $row=mysqli_fetch_assoc($result);

    if(empty($row)){
        $output['state']=0;
    }else if($row['apassword'] === $apassword){
        $output['state']=1;
    }else{
        $output['state']=2;
    }

    echo json_encode($output);
?>