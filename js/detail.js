
var img = $('.middle').children()[0];
var arr = $('.shop-right').children();
var h2 = arr[0];
var p = arr[1].children[0];
var span = arr[2].children[0];
var h3 = arr[2].children[1];
var bigimg = $('.big');
if(window.sessionStorage.num){
    var num = window.sessionStorage.num; 
}else{
    num = 0;
}
img.setAttribute('src',window.sessionStorage.imgurl);
h2.innerHTML = window.sessionStorage.p;
p.innerHTML = parseInt(window.sessionStorage.price.substring(1));
bigimg[0].setAttribute("style","background-image:url("+window.sessionStorage.imgurl+")");
//  在详情页加入购物车功能
h3.onclick =function(){
    $.get('../interface/addwq.php',{
        id:window.sessionStorage.index,
        img:window.sessionStorage.imgurl,
        price:p.innerHTML,
        name:h2.innerHTML
    },function(data){
        var json = JSON.parse(data);
        if(json.code==1){
            alert('添加商品成功');
            window.sessionStorage.num = ++num;
            window.location.reload();        
        }
    })
}
//  购物车同步
if(window.sessionStorage.num){

    var inp1 = $('.input').children()[3];
    inp1.children[0].children[1].innerHTML=window.sessionStorage.num;
    console.log(inp1);
}

    // 登录同步
    var login = $('.login').parent();
    if(window.sessionStorage.name){
        login.html('欢迎您      '+window.sessionStorage.name);
        console.log(login);
    }
    


// 放大镜

    function Enlarge(classname){
        // 将需要操作的元素都获取成对象属性
        this.box = document.querySelector("."+classname);
        this.m = this.box.querySelector(".shop-left");
        this.middleImg = this.box.querySelector(".shop-left img");
        this.middle = this.box.querySelector(".middle");
        this.shade = this.box.querySelector(".shade");
        this.big = this.box.querySelector(".big");
        var _this = this;
        // 绑定事件
        this.middle.onmouseenter = ()=>{
            this.over();
        }
        this.middle.onmouseleave= ()=>{
            // console.log(456);
            this.out();
        }
      
    }
   
    // 定义鼠标离开中的图片上的方法
    Enlarge.prototype.out = function(){
        this.shade.style.display = "none"
        this.big.style.display = "none"
    }
    // 定义鼠标放到中等图片上的方法
    Enlarge.prototype.over = function(){
        // console.log(123);
        this.shade.style.display = "block"
        this.big.style.display = "block"
        var _this = this;
        // 需要一个鼠标移动事件
        this.middle.onmousemove=function(e){
            // console.log(123);
            // 拖拽- 需要获取光标位置
            var e = e || window.event;
            var x = e.pageX;
            var y = e.pageY;
            // console.log(x,y);
            var l = x - _this.box.offsetLeft - this.offsetLeft - _this.shade.offsetWidth/2;
            if(l<=0){
                l=0;
            }
            if(l>=this.clientWidth - _this.shade.offsetWidth){
                l=this.clientWidth - _this.shade.offsetWidth
            }
            _this.shade.style.left = l + "px";
            var t = y - _this.box.offsetTop - this.offsetTop - _this.shade.offsetHeight/2;
            if(t<=0){
                t = 0;
            }
            if(t>=this.clientHeight - _this.shade.offsetHeight){
                t=this.clientHeight - _this.shade.offsetHeight
            }
            _this.shade.style.top = t + "px";
            // 大图也跟着移动
            _this.fangda(l,t);
        }
    }
    Enlarge.prototype.fangda = function(l,t){
        // 需要计算移动过的比例
        // 遮罩距离左边的距离 - l
        // 大图的宽度
        var w = this.middle.clientWidth;
        // 比例就是 l/w;
        var percentw = l/w;
        // 根据这个比例计算大图的left值
        // 这个比例就应该等于 大图的left/大图的宽度（大图宽度设置过背景大小）
        // 获取背景大小
        var style = window.getComputedStyle(this.big).backgroundSize;
        // 获取到的是宽px 高px组成的一个字符串 ，需要使用空格分隔获取到具体的宽和高
        var bigW = parseInt(style.split(" ")[0]);
        // 大图的left就是比例 * 大图的宽
        var bigL = percentw * bigW;
    
        // 高度
        var h = this.middle.clientHeight;
        var percenth = t/h;
        var bigH = parseInt(style.split(" ")[1]);
        var bigT = percenth * bigH;
        // 需要设置给背景的定位
        this.big.style.backgroundPosition = `-${bigL}px -${bigT}px`;
    }
    var enlarge = new Enlarge("shop-con");