var app = {
  init:function () {
    this.pageShow();
    this.swiperBtn();
    this.bigImg();
    this.leaveWordFun();
  },
  swiperBtn:function () {
    $(" .swiper-container ").on("mouseenter",function () {
      $(".swiper-button-prev,.swiper-button-next").removeClass("hide");
    });
    $(".swiper-container").on("mouseleave",function () {
      $(".swiper-button-prev,.swiper-button-next").addClass("hide");
    });
  },
  // banner轮播
  swiper1: function() {
    var mySwiper1 = new Swiper('.swiper-container1', {
      direction: 'horizontal',
      effect: 'fade',
      loop: true,
      autoplay: 3000, //自动播放
      speed: 2000,    //播放速度
      autoplayDisableOnInteraction: false,
      // 分页器
      pagination: '.swiper-pagination',
      paginationClickable: true,
    });
  },
  // 图片展示轮播
  swiper2: function () {
    var mySwiper2 = new Swiper('.swiper-container2', {
      direction: 'horizontal',
      slidesPerView : 3,
      loop: true,
      autoplay: 1500, //自动播放
      speed: 500,    //播放速度
      autoplayDisableOnInteraction: false,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    });
  },
  // 详情轮播
  swiper3: function () {
    var mySwiper3 = new Swiper('.swiper-container3', {
      direction: 'horizontal',
      speed: 2000,    //播放速度
      autoplayDisableOnInteraction: false,
      // 分页器
      pagination: '.swiper-pagination',
      paginationClickable: true,
      //前进后退
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    });
  },
  //创建元素函数
  element: function (tag,attrs,html) {
    var element = document.createElement(tag);
    // 判断第二个参数是属性还是内容
    if(typeof(attrs) === "string"){
      html = attrs;
      attrs = null;
    }
    // 判断是否有属性
    if(attrs !== undefined){
      for(var attr in attrs){
        element.setAttribute(attr,attrs[attr]);
      }
    }
    // 判断是否有内容
    if(html !== undefined){
      element.innerHTML = html;
    }
    return element;
  },

  pageShow: function () {
    $.ajax({
      url: "data/main.php",
      type: "get",
      success:function (data) {
        this.bannerFun(data);
        this.newsFun(data);
        this.imgShowFun(data);
        this.specialtyFun(data);
      }.bind(this)
    });
  },
  // banner
  bannerFun: function (data) {
    var bannerList = data.bannerList;
    var fragmentBanner = document.createDocumentFragment();

    for(var i = 0;i < bannerList.length;i++){
      var divBanner = this.element(
        "div",
        {
          "class":"swiper-slide",
          "id":bannerList[i].name,
        },
        "<a href=\"javascript:void(0);\">\n" +
        "  <images src=\"images/"+bannerList[i].src+"\"/>\n" +
        "  <p class=\"banner-text\">"+bannerList[i].title+"</p>\n" +
        "</a>"
      );

      $(divBanner).appendTo($(fragmentBanner));
    }

    $(fragmentBanner).appendTo($(".swiper-container1 .swiper-wrapper"));

    this.swiper1();
  },
  // 新闻公告
  newsFun: function (data) {
    var newsList = data.newsList;
    var fragmentNews = document.createDocumentFragment();
    var more = this.element(
      "a",
      {
        "href":"news.html",
        "target":"_blank",
        "style":"float: right;margin: 20px 10px 0 0;color:yellow"
      },
      "新闻头条>"
    );
    for(var i =newsList.length-1;i>=0;i--){

      var divNews = this.element(
        "div",
        {"class":"news-bulletin-item"},
        "<a href="+newsList[i].href+" class=\"clearfix\" target=\"_blank\">\n" +
        "  <p class=\"item-title fl\">\n"+newsList[i].title+"</p>\n" +
        "  <p class=\"item-time fr\">\n"+newsList[i].ntime+ "</p>\n" +
        "</a>"
      );

      $(divNews).appendTo($(fragmentNews));
    }
      $(more).appendTo($(fragmentNews));
    $(fragmentNews).appendTo($(".news-bulletin-content"));
  },
  // imgshow
  imgShowFun: function (data) {
    var imgList = data.bannerList;
    var fragmentImgShow = document.createDocumentFragment();
    var len = imgList.length;
    for(var i = 0;i < len;i++){
      for(var j = 0;j < parseInt(imgList[i].imgcount);j++){
        var div = this.element(
          "div",
          {"class":"swiper-slide"},
          "<a href=\"javascript:void(0);\">\n" +
          "  <images class='small-images' src=\"images/scenery/"+imgList[i].name+"/"+imgList[i].name+"-0"+(j+1)+".jpg\"/>\n" +
          "</a>"
        );
        $(div).appendTo($(fragmentImgShow));
      }
    }

    $(fragmentImgShow).appendTo($(".swiper-container2 .swiper-wrapper"));

    this.swiper2();
  },
  // 特产
  specialtyFun: function (data) {
    var specialtyList = data.specialtyList;
    var idList = [];
    var fragmentSpecialty = document.createDocumentFragment();
    var fragmentScenery = document.createDocumentFragment();
    var imgFile = "specialty";
    for(var i =0;i < specialtyList.length;i++){
      // 获取id列表
      idList.push(specialtyList[i].name);

      if(specialtyList[i].type === "0"){
        imgFile = "specialty";
        var divSpecialty = this.element(
          "div",
          {
            "class":"specialty-item clearfix",
            "id":specialtyList[i].name
          },
          "<div class=\"item-images\">\n" +
          "              <a>\n" +
          "                <images class=\"center\" src=\"images/"+imgFile+"/"+specialtyList[i].name+"/"+specialtyList[i].name+"-01.jpg\" alt=\"\">\n" +
          "              </a>\n" +
          "            </div>\n" +
          "            <div class=\"item-info\">\n" +
          "              <p class=\"item-title\">\n" +
          "                <a>"+specialtyList[i].title+"</a>\n" +
          "              </p>\n" +
          "              <p class=\"item-describe\">" +
          specialtyList[i].des.split("|")[0] +
          "......<a>[详细]</a>" +
          "</p>\n" +
          "            </div>"
        );

        $(fragmentSpecialty).html($(divSpecialty));

      }else if(specialtyList[i].type === "1"){
        imgFile = "scenery";
        var divScenery = this.element(
          "div",
          {
            "class":"specialty-item clearfix",
            "id":specialtyList[i].name
          },
          "<div class=\"item-images\">\n" +
          "              <a>\n" +
          "                <images class=\"center\" src=\"images/"+imgFile+"/"+specialtyList[i].name+"/"+specialtyList[i].name+"-01.jpg\" alt=\"\">\n" +
          "              </a>\n" +
          "            </div>\n" +
          "            <div class=\"item-info\">\n" +
          "              <p class=\"item-title\">\n" +
          "                <a>"+specialtyList[i].title+"</a>\n" +
          "              </p>\n" +
          "              <p class=\"item-describe\">" +
          specialtyList[i].des.split("|")[0] +
          "......<a>[详细]</a>" +
          "</p>\n" +
          "            </div>"
        );
        $(fragmentScenery).html($(divScenery));
      }
    }
    $(".specialty-content").html($(fragmentSpecialty));
    $(".scenery-content").html($(fragmentScenery));

    $(".specialty-content,.scenery-content").on("click","a",function (e) {
      if(e.target.tagName === "A"){
        var did = $(e.target).parents(".specialty-item").attr("id");
        sessionStorage.setItem("detailId",did);
        sessionStorage.setItem("idList",idList);
        location.href = "detail.html";
      }
    }.bind(this));
  },
  // 详情页
  detailFun : function () {
    var idList = sessionStorage.getItem("idList").split(",");
    var index = "";
    var _did = sessionStorage.getItem("detailId");

    for (var n = 0;n<idList.length;n++){
      if(idList[n]===_did){
        index = n;
      }
    }
    this.detailShow(idList[index]);

    $(".main-container .btn-prev").on("click",function (e) {
      var e = e.target;
      index--;
      if(index <= 0){
        this.detailShow(idList[0]);
        $(e).html("这已经是第一条");
        index = 0;
      }else{
        this.detailShow(idList[index]);
        $(e).html("上一条");
        $(".btn-next a").html("下一条");
      }
    }.bind(this));
    $(".main-container .btn-next").on("click",function (e) {
      var e = e.target;
      index++;
      if(index >= idList.length-1){
        this.detailShow(idList[idList.length-1]);
        $(e).html("这已经是最后一条");
        index = idList.length-1;
      }else{
        this.detailShow(idList[index]);
        $(e).html("下一条");
        $(".btn-prev a").html("上一条");
      }
    }.bind(this));
  },
  detailShow: function (_id) {
    $.ajax({
      url:"data/detail.php?name="+_id,
      type:"get",
      success:function (data) {
        var imgFile = "specialty";
        if(data[0].type==="0"){
          imgFile = "specialty";
          $($(".home-nav li")[1]).addClass("active")
            .siblings("li").removeClass("active");
        }else if(data[0].type==="1"){
          imgFile = "scenery";
          $($(".home-nav li")[2]).addClass("active")
            .siblings("li").removeClass("active");
        }
        // title
        $(".detail-content .detail-title").html(data[0].title);
        // banner
        var fragmentBanner = document.createDocumentFragment();
        for(var i = 0;i<data[0].imgCount;i++){
          var divBanner = this.element(
            "div",
            {"class":"swiper-slide"},
            "<a href=\"javascript:void(0);\">\n" +
            "  <images class=\"small-images\" src=\"images/"+imgFile+"/"+data[0].name+"/"+data[0].name+"-0"+(i+1)+".jpg\" alt=\"\">\n" +
            "</a>"
          );

          $(divBanner).appendTo($(fragmentBanner));
        }
        $(".detail-banner .swiper-wrapper").html($(fragmentBanner));

        // 描述
        var fragmentDes = document.createDocumentFragment();
        var des = data[0].des.split("|");
        for(var j = 0;j<des.length;j++){
          var pDes = this.element("p",{"class":"describe-section"},des[j]);

          $(pDes).appendTo($(fragmentDes));
        }
        $(".detail-describe").html($(fragmentDes));

        this.swiper3();
      }.bind(this)
    });
  },
  // 大图
  bigImg: function () {
    //显示大图
    $(".swiper-wrapper").on("click",".swiper-slide images.small-images",function (e) {
      var e = e.target;
      var _index = $(e).parents(".swiper-slide").index();
      var arr = $(e).parents(".swiper-wrapper").find(".swiper-slide");
      $(".picture-large-show").show().children("images")
        .attr("src",$(e).attr("src"));
      //上一张按钮
      $(".picture-large-show .btn-prev").on("click",function () {
        if(_index === 0){
          _index = arr.length;
        }
        var _src = $(arr[_index - 1]).find("images").attr("src");
        $(".picture-large-show").show().children("images").attr("src",_src);
        _index--;
      });
      //下一张按钮
      $(".picture-large-show .btn-next").on("click",function () {
        if(_index === arr.length){
          _index = 0;
        }
        var _src = $(arr[_index + 1]).find("images").attr("src");
        $(".picture-large-show").show().children("images").attr("src",_src);
        _index++;
      });
    });
    //隐藏大图
    $(".picture-mask,.icon-mask-close").on("click",function () {
      $(".picture-large-show").hide();
    });
  },
  //地图
  map : function () {
    // 百度地图API功能
    var map = new BMap.Map("myMap");    // 创建Map实例
    var point=new BMap.Point(111.4972064092,33.1444807970);
    map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    //添加比例尺等控件
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    //var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
    /*缩放控件type有四种类型:
     BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);

    //添加缩略图
    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
    map.addControl(overView);          //添加默认缩略地图控件
    map.addControl(overViewOpen);      //右下角，打开
    //添加点
    var marker = new BMap.Marker(point); // 创建点
    map.addOverlay(marker);            //增加点
  },
  // 留言
  leaveWordFun:function () {
    $(".btn-submit").on("click",function () {
      var message = $(".leave-word-form").serialize();
      $.ajax({
        url:"data/leave-word-submit.php?"+message,
        type:"post",
        success:function (data) {
          // 显示提示框
          $(".leave-word-after").removeClass("hide");
          // 根据提交结果显示提示内容
          $(".leave-word-after .title").html(data.msg);
        }.bind(this)
      });
    }.bind(this));
    // 继续留言
    $(".leave-word-after .fl").on("click",function () {
      location.reload();
    });
    // 查看留言
    $(".leave-word-after .fr").on("click",function () {
      // 隐藏表单
      $(".leave-word-after,.leave-word-form").addClass("hide");
      // 显示留言内容
      $(".leave-word-list").removeClass("hide");
      var start = 0;
      // 获取留言列表
      this.leaveWordPage(start);
      this.fenyeFun();
    }.bind(this));
    // 添加留言
    $(".leave-word-list .title a").on("click",function () {
      location.reload();
    });
  },
  leaveWordPage:function (start) {
    $.ajax({
      url:"data/leave-word-show.php?start="+start,
      type:"get",
      success:function (data) {
        // 渲染当前留言页内容
        var fragmentLeave = document.createDocumentFragment();
        for(var i =0;i<=data.pageList.length-1;i++){
          var divItem = this.element(
            "div",
            {
              "class": "leave-word-item"
            },
            "<div class=\"top clearfix\">\n" +
            "              <p title='姓名' class=\"lname\">"+data.pageList[i].lname+"</p>\n" +
            "              <p title='联系方式' class=\"lcontact\">"+data.pageList[i].lcontact+"</p>\n" +
            "              <p>第"+data.pageList[i].nid+"楼</p>\n" +
            "            </div>\n" +
            "            <div class=\"lcontent\">\n" +
            data.pageList[i].lcontent +
            "            </div>\n" +
            "            <div class=\"ltime\">\n" +
            data.pageList[i].ltime +
            "            </div>"
          );
          $(divItem).appendTo($(fragmentLeave));
        }
        $(".leave-word-items").html($(fragmentLeave));
      }.bind(this)
    });
  },
  // 分页器
  showPages:function (page,total){
    var str = '<a class="active" href="#javascript:void(0);">'+page+ '</a> ';
    for (var i = 1;i <= 3;i++){
      if(page - i >= 1){
        str = '<a href="#javascript:void(0);">'+(page - i) + '</a> ' +str;
      }
      if(page + i < total){
        str = str +　'<a href="#javascript:void(0);">'+(page + i) +'</a> ';
      }
    }
    if(page === 5){
      str ='<a href="#javascript:void(0);">'+ '上一页 '+'</a> ' + '<a href="#javascript:void(0);">'+1+'</a> ' +str;
    }else if(page - 4 > 1) {
      str ='<a href="#javascript:void(0);">'+ '上一页 '+'</a> ' + '<a href="#javascript:void(0);">'+1+'</a> ' + '... ' +str;
    }
    if(page + 4 < total){
      str = str + '...' + '<a href="#javascript:void(0);">'+total +'</a> '+ '<a href="#javascript:void(0);">'+ ' 下一页'+'</a> '
    }else if(page  < total){
      str = str + ' ' + '<a href="#javascript:void(0);">'+total +'</a> ' +  '<a href="#javascript:void(0);">'+ ' 下一页'+'</a> '
    }
    return str;
  },
  update:function(n,total){
    var show=this.showPages(n,total);
    $(".pagination-device").html(show);
    console.log(total);
  },
  skip:function (n,total) {
    $(".pagination-device").on("click","a",function (e) {
      var data=e.target.innerHTML;
      var html=parseInt(data);
      if(html%1===0){
        n = html;
        $(e.target).addClass("active").siblings("a").removeClass("active");
      }
      if(data.indexOf("上")>-1){
        n--;
      }
      if(data.indexOf("下")>-1){
        n++;
      }
      this.leaveWordPage((n-1)*5);
      this.update(n,total);
    }.bind(this))
  },
  fenyeFun:function () {
    $.ajax({
      url:"data/leave-word-show.php?start=0",
      type:"get",
      success:function (data) {
        var n = 1;
        var pageCount = Math.ceil(data.pageCount/5);
        this.update(n,pageCount);
        this.skip(n,pageCount);
      }.bind(this)
    });
  },
};
app.init();























