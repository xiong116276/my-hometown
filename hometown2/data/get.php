<?php
    header("Content-Type:application/json;charset:utf-8");
    $file_contents = file_get_contents('http://v.juhe.cn/toutiao/index?type=top&key=22f829f3a369fdd11613b6f94eb565f8');
    echo $file_contents;
?>