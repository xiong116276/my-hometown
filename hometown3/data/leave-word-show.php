<?php
    header("Content-Type:application/json,charset=utf-8");
    $conn = mysqli_connect('127.0.0.1',' ',' ','bdm28760038_db',3306);
    $start=$_REQUEST["start"];
    if(empty($start)){
        $start=0;
    }
    $output=(object)array();
    $count = 5;
    $pageCount = 0;
    $pageList = array();
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $sql = "SELECT COUNT(nid) FROM leaveWordList";
    $result = mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==null){
        $pageCount=$row['COUNT(nid)'];
    }

    $sql = "SELECT * FROM leaveWordList LIMIT $start,$count";
    $result = mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==null){
        $pageList[]=$row;
    }
    $output -> pageList = $pageList;
    $output -> pageCount = $pageCount;
    echo json_encode($output);

?>