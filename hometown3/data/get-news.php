<?php
    header("Content-Type:application/json,charset=utf-8");

    $conn = mysqli_connect('bdm28760038.my3w.com','bdm28760038','aa116276','bdm28760038_db',3306);

    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql="SELECT * FROM newsList";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
        $output[]=$row;
    }

    echo json_encode($output);
?>