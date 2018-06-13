<?php
    header("Content-Type:application/json,charset=utf-8");

   $conn = mysqli_connect('127.0.0.1',' ',' ','bdm28760038_db',3306);

    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = (object)array();
    $bannerList = array();
    $newsList = array();
    $specialtyList = array();

    $sql="SELECT * FROM bannerList";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
        $bannerList[]=$row;
    }

    $sql="SELECT * FROM newsList";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
        $newsList[]=$row;
    }

    $sql="SELECT * FROM specialtyList";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
        $specialtyList[]=$row;
    }

    $output -> bannerList = $bannerList;
    $output -> newsList = $newsList;
    $output -> specialtyList = $specialtyList;

    echo json_encode($output);
?>