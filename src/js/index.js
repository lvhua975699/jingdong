

  var mySwiper1 = new Swiper ('.swiper-container.banner-lnubo', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 是否无缝轮播
      autoplay:{
          disableOnInteraction: false,
      },//是否自动轮播
      delay:1000,
      effect:'fade',
      // 如果需要分页器 小圆点

      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        hiddenClass: 'my-button-hidden',
      },
    })    
    mySwiper1.el.onmouseover = function(){ //鼠标放上暂停轮播
      mySwiper1.autoplay.stop();
    }
    mySwiper1.el.onmouseleave = function(){
      mySwiper1.autoplay.start();
    } 
    
    var mySwiper2 = new Swiper ('.swiper-container.banner-qiehuan', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 是否无缝轮播
      delay:10000,
      effect:'fade',

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        // hiddenClass: 'my-button-hidden',
      },
    })  
    mySwiper2.el.onmouseover = function(){ //鼠标放上暂停轮播
     
      mySwiper2.navigation.$nextEl.removeClass('hide');
      mySwiper2.navigation.$prevEl.removeClass('hide');
    }
    mySwiper2.el.onmouseleave = function(){
      mySwiper2.navigation.$nextEl.addClass('hide');
      mySwiper2.navigation.$prevEl.addClass('hide');
    } 




    var mySwiper3 = new Swiper ('.swiper-container.sekill-shop', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 是否无缝轮播
      delay:10000,
      effect:'slide',

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        // hiddenClass: 'my-button-hidden',
      },
    })      

    var mySwiper4 = new Swiper ('.swiper-container.sekill-lunbo', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 是否无缝轮播
      autoplay:{
          disableOnInteraction: false,
      },//是否自动轮播
      delay:1000,
      effect:'slide',
      // 如果需要分页器 小圆点

      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },

    }) 
    

   //橱窗效果 发现好货

    var moves=document.querySelector(".smbottom");
    var smShop=document.querySelector(".find-right");
    var xbtn=document.querySelector(".xmove");
    var smtop=document.querySelector(".smtop");
    smShop.onmouseover=function(){
        clearInterval(timer)
        moves.style.display="block";
    }
    smShop.onmouseout=function(){
        timer=timer=setInterval(time,30);
        moves.style.display="none";
    }
    xbtn.onmousedown=function(e){
        var e=e||window.event;
        var x=e.offsetX;
        var y=e.offsetY;
        var w=smShop.offsetLeft;
        document.body.onmousemove=function(e){
            var e=e||window.event;
            var l=e.clientX;
            var h=e.clientY;       
            var movex=l-x-w;
            xbtn.style.left=movex+"px";     
            if(movex<=0){
                movex=0;
            xbtn.style.left=0+"px";
            }else if(movex>=900){
                movex=900;

            xbtn.style.left=900+"px";
            }
            smtop.style.left=-(20/9)*movex+"px";
            e.preventDefault();        
        }
        e.preventDefault();		
        }
    document.body.onmouseup=function(){
        document.body.onmousemove=null
    }
    //动画
    var str=0;
    var timer=setInterval(time,30)

    function time(){
        str++;
        if(str>=2000){
            str=0;
        }
        smtop.style.left=-str+"px";
        xbtn.style.left=(9/20)*str+"px";     
    }

    // banner 左侧列表显示效果
    $('.banner-list').children().on('mousemove',function(){
      $('.list-xianshi').css({
        display:'block'
      })
    })

    $('.banner-list').on('mouseout',function(){
      $('.list-xianshi').css({
        display:'none'
      })
    })
 
      

    // 输入框联想
    $('.search').on('input',function(){ 
      //1 获取输入的关键字
      var text = $(this).val();
      //2 利用$.ajax发请求
      $.ajax({
          //callback=fn不能直接写在参数里面,要jquery帮助我们自动拼接
          url:"https://suggest.taobao.com/sug?code=utf-8&q="+text+"&_ksTS=1593314375249_483&k=1&area=c2c&bucketid=12",
          success:function(data){
              //为了防止重复添加li要先把ul里面内容
              $('.think').empty()
              //获取数据要先打印
              console.log(data.result);
              //全局的each方法:$.each(要遍历的对象,每次遍历执行的函数)
              $.each(data.result,function(index,value){
                  $('.think').append('<a href="#"><li>'+value[0]+'</li></a>')
              })
              
          },
          dataType:"jsonp"
      })
    
    })



// 商品跳转详情页同步
var arr = $('.shop-con').children();
$.each(arr,function(index,value){
  
  arr[index].onclick = function(){
    var imgurl = arr[index].children[0].children[0].getAttribute('src');
    var p = arr[index].children[1].innerHTML;
    var price = arr[index].children[2].children[0].innerHTML;
    window.sessionStorage.index = index;
    window.sessionStorage.imgurl = imgurl;
    window.sessionStorage.p = p;
    window.sessionStorage.price = price;
  }
})

   // 登录同步
   var login = $('.login').parent();
   if(window.sessionStorage.name){
       login.html('欢迎您      '+window.sessionStorage.name);
   }
   

  //  购物车同步
  if(window.sessionStorage.num){

  var inp1 = $('.input').children()[2];
  inp1.children[0].children[1].innerHTML=window.sessionStorage.num;

  var inp2 = $('.sow-con').children()[1].children[2].children[0].children[1];
  inp2.innerHTML=window.sessionStorage.num;
  }
    //  楼层跳跃
   //获取相关元素
   var inp = document.querySelector('.sow');
   var floor = document.querySelector('.floor');


  window.onscroll = function(){
    // 2. 获取卷去的高度
    var topD = document.documentElement.scrollTop || document.body.scrollTop
    // 3. 判断 topD 是不是大于 300
    if (topD > 300) {
      // div 该显示了
      inp.style.top = '0'
      floor.style.opacity = 1;
    } else {
      // div 该隐藏了
      inp.style.top = '-54px'
      floor.style.opacity = 0;
    }

  }
 

  // 商品加载更多
  var shopcon = $('.shop-con')[0];
  var btnmore = $('.btnmore').children()[0];
  btnmore.onclick = function(){
    
    var str = "";
    for(var i = 0;i<10;i++){
     str = ` <i><img src="https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/98657/18/16293/87095/5e797559E23aa5e2a/4437e27bf7dd99b2.jpg.webp" alt=""></i>
            <p>【仙女星空款】劳士顿手表女 星空小清<br>新满天星学生抖音网红时尚潮流防水超薄进口机芯女士腕表情侣礼物 L3623-1(明星款丨璀璨星空)</p>
            <span><em>￥288</em><em>.00</em></span>`;
      var a = document.createElement("a");
      a.setAttribute("href","./detail.html")
      a.innerHTML = str;
      shopcon.appendChild(a);
    
    }
  }