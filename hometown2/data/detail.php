<?php
    header("Content-Type:application/json,charset=utf-8");

    $conn = mysqli_connect('127.0.0.1',' ',' ','bdm28760038_db',3306);

    $name=$_REQUEST["name"];
    if(empty($name)){
        return;
    }

    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $detailItem = array();

    $sql="SELECT * FROM specialtyList where name='$name'";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
        $detailItem[]=$row;
    }

    echo json_encode($detailItem);
?>