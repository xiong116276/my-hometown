<?php
    header('Content-type:application/json;charset=utf-8');
    $page = $_REQUEST['page'];
    //配置您申请的appkey
    $appkey = "932d367ed95f8e2e638217093a45a887";
    $url = "http://japi.juhe.cn/joke/content/text.from";
    $params = array(
          "page" => $page,//当前页数,默认1
          "pagesize" => "20",//每次返回条数,默认1,最大20
          "key" => $appkey,//您申请的key
    );
    $paramstring = http_build_query($params);
    $result = file_get_contents($url.'?'.$paramstring);

    if($result){
        echo $result;
    }else{
        echo "请求失败";
    }
?>