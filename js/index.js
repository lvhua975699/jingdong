window.onload = function(){
    function Slider(id){
        //轮播图容器
        this.container = document.getElementById(id);
        //轮播图中的所有的图片li集合    
        this.imgArr = this.container.children[0].children[0].children;
        //控制轮播图的左右箭头和小圆点所在的容器
        this.ctrl = this.container.children[1];
        //当前是第几个图
        this.index = 0;
        //每个li的宽度
        this.width = this.imgArr[0].offsetWidth
        //定时器
        this.timer = null;
        //初始化轮播图方法
        this.init = function(){
        /*
            1 根据图片li的数量生成相同数量的小圆点,把小圆点放到this.ctrl里面
            2 点亮索引是index的小圆点
            3 点击小圆点,小圆点高亮,显示对应的图片
            4 点击右箭头,看下一张图片
            5 点击左箭头,看上一张图片
            6 自动轮播
            7 鼠标移入轮播图停止轮播,鼠标移出轮播图开始轮播
        */
            this.newPoints();
            this.light();//点亮第0个小圆点
            var that = this;
            this.ctrl.onclick = function(e){                
                var evt = window.event || e;
                var target = evt.target || evt.srcElement;
                if(target.className.indexOf('slider-ctrl-con')>-1){
                    //小圆点
                    that.clickPoint(target.index) 
                }
                else if(target.className=='prev'){
                    //上一张
                    that.prev()
                }
                else if(target.className=='next'){
                    //下一张
                    that.next()
                }
            };
            this.autoPlay();
            this.container.onmouseenter = function(){
                //停止轮播
                clearInterval(that.timer)
            }
            this.container.onmouseleave = function(){
                //开始轮播
                that.autoPlay();
            }


        }
        this.newPoints = function(){
            //根据图片li的数量生成相同数量的小圆点,把小圆点放到this.ctrl里面
            for(var i=this.imgArr.length-1;i>=0;i--){
                var newPoint = document.createElement('span');
                newPoint.className = "slider-ctrl-con";
                //给每个小圆点添加一个自定义属性,记录他是第几个小圆点
                newPoint.index = i;
                //每个小圆点都放到this.ctrl的第一个子元素的前面
                this.ctrl.insertBefore(newPoint,this.ctrl.children[0]); 
                //其他图片都固定到容器的右边
                this.imgArr[i].style.left = this.width+"px";
            }
            //只有当前图片在容器中
            this.imgArr[0].style.left = 0;

        };

        this.light = function(){
            var spanArr = this.ctrl.children;
            //点亮索引是index的小圆点
            for(var i=0;i<spanArr.length-2;i++){
                spanArr[i].className = "slider-ctrl-con"
            }
            spanArr[this.index].className = "slider-ctrl-con current"
        };
        this.clickPoint = function(index){
            //点击小圆点,小圆点高亮,显示对应的图片
            //当前图片索引是this.index,要看的index
            if(index>this.index){
                //把当前图片瞬移到右边
                this.imgArr[index].style.left = this.width+"px";
                animation(this.imgArr[index],{left:0})
                animation(this.imgArr[this.index],{left:-this.width})
            }
            else if(index<this.index){
                //把当前图片瞬移到左边
                this.imgArr[index].style.left = -this.width+"px";
                animation(this.imgArr[index],{left:0})
                animation(this.imgArr[this.index],{left:this.width})
            }
            this.index = index;
            this.light()
        }
        this.next = function(){
            //看下一张图片
            var index = this.index +1;
            if(index>this.imgArr.length-1){
                index = 0;
            }
            this.imgArr[index].style.left = this.width+"px";
            animation(this.imgArr[index],{left:0})
            animation(this.imgArr[this.index],{left:-this.width});
            this.index = index;
            this.light()
        }
        this.prev = function(){
            //看上一张图片
            var index = this.index -1;
            if(index<0){
                index = this.imgArr.length-1;
            }
            this.imgArr[index].style.left = -this.width+"px";
            animation(this.imgArr[index],{left:0})
            animation(this.imgArr[this.index],{left:this.width});
            this.index = index;
            this.light()
        }
        this.autoPlay = function(){
            //自动轮播
            clearInterval(this.timer);
            //1 箭头函数不会改变this指向,有兼容问题
            // this.timer = setInterval(()=>{
            //     this.next()
            // },3000)
            //2 bind可以指定函数中this的指向,有兼容问题,bind不执行函数
            // this.timer = setInterval(this.next.bind(this),3000)
            //3 call可以改变函数中this的执行,call会执行函数
            var that = this;
            this.timer = setInterval(function(){
                that.next.call(that)
            },3000)

        }
        
    }


    function Slider1(id){
        //轮播图容器
        this.container = document.getElementById(id);
        //轮播图中的所有的图片li集合    
        this.imgArr = this.container.children[0].children[0].children;
        //控制轮播图的左右箭头和小圆点所在的容器
        this.ctrl = this.container.children[1];
        //当前是第几个图
        this.index = 0;
        //每个li的宽度
        this.width = this.imgArr[0].offsetWidth
        //定时器
        this.timer = null;
        //初始化轮播图方法
        this.init = function(){
            var that = this;
            this.container.onmouseenter = function(){
                
               that.ctrl.style.display = 'block'
               that.ctrl.onclick = function(e){                
                   var evt = window.event || e;
                   var target = evt.target || evt.srcElement;
                   if(target.className=='prev'){
                       //上一张
                       that.prev()
                   }
                   else if(target.className=='next'){
                       //下一张
                       that.next()
                   }
               }
            }
            this.container.onmouseleave = function(){
                that.ctrl.style.display = 'none'
            }
        }
        this.next = function(){
            //看下一张图片
            var index = this.index +1;
            if(index>this.imgArr.length-1){
                index = 0;
            }
            this.imgArr[index].style.left = this.width+"px";
            animation(this.imgArr[index],{left:0})
            animation(this.imgArr[this.index],{left:-this.width});
            this.index = index;
        }
        this.prev = function(){
            //看上一张图片
            var index = this.index -1;
            if(index<0){
                index = this.imgArr.length-1;
            }
            this.imgArr[index].style.left = -this.width+"px";
            animation(this.imgArr[index],{left:0})
            animation(this.imgArr[this.index],{left:this.width});
            this.index = index;
        }
        
    }


    var slider = new Slider('slider');
    slider.init()
    var slider1 = new Slider1('banner-slider');
    slider1.init()
    var slider2 = new Slider1('sekill-shop');
    slider2.init();

}