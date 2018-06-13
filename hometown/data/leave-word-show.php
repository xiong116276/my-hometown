<?php
    header("Content-Type:application/json,charset=utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);
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

    $sql = "SELECT COUNT(nid) FROM leavewordlist";
    $result = mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==null){
        $pageCount=$row['COUNT(nid)'];
    }

    $sql = "SELECT * FROM leavewordlist LIMIT $start,$count";
    $result = mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==null){
        $pageList[]=$row;
    }
    $output -> pageList = $pageList;
    $output -> pageCount = $pageCount;
    echo json_encode($output);

?>