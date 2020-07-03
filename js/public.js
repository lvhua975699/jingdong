//获取元素的样式:第一个参数是你要获取样式的dom节点,第二个参数是你要获取的样式名字(字符串)
function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom)[attr]
    }else{
        return dom.currentStyle[attr]
    }
}


//根据id获取元素
function $id(id){
    return document.getElementById(id);
}


//封装好的运动函数直接调用
function move(dom,target){
    //要用定时器,先清定时器
    clearInterval(dom.timer);
    //每隔一段时间运动一段距离
    dom.timer = setInterval(function(){
        //1)获取元素当前位置
        var current = dom.offsetLeft;
        //2)设置速度
        var speed = target>current?20:-20;
        //3)计算元素下一个位置
        var next = current + speed;
        //4)有条件的定位元素
        //如果元素距离当前位置不足一步,直接到位
        if(Math.abs(target - next)<=20){
            dom.style.left = target+"px";
            clearInterval(dom.timer);
        }else{
            dom.style.left = next+"px";
        } 
        
    },1000/60)
}


//缓动函数
function animate(dom,target,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var current = dom.offsetLeft;
        var speed = target > current?Math.ceil((target - current)/10):Math.floor((target - current)/10);
        var next = speed + current;
        if(next==target){
            dom.style.left = target+"px";
            clearInterval(dom.timer)
            fn&&fn()
            
        }else{
            dom.style.left = next+"px";   
        }
    },1000/60)
}

//透明度缓动函数,target必须是0-100之间的整数
function opacityMove(dom,target,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        //1 获取元素当前透明度
        var current = parseInt(getStyle(dom,'opacity')*100);
        //2 设置速度
        var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)
        //3 计算元素下一次的透明度
        var next = current + speed;
        //4 有条件的设置透明度
        if(next==target){
            dom.style.opacity = target/100;
            dom.style.filter = "alpha(opacity="+target+")";
            clearInterval(dom.timer);
            //动画完成后执行函数fn
            fn&&fn()
        }else{
            dom.style.opacity = next/100;
            dom.style.filter = "alpha(opacity="+next+")";
        }
        
    },1000/60)
}


/*
功能:单属性attr缓动到指定位置target
参数:
    参数1:dom 要运动的节点,必传
    参数2:attr要缓动的属性名,必传
    参数3:target要缓动的属性目标值,必传,如果是透明度,传0-100的整数
    参数4:fn,缓动完成的回调函数,可选,必须传函数
*/

function move2(dom,attr,target,fn){
    //每隔一段时间运动一段距离
    //要用定时器先清定时器
    clearInterval(dom.timer)
    //一个节点上同时只有一个定时器
    dom.timer = setInterval(function(){
        //1 获取元素当前位置,为了去除单位,使用parseInt取整
        if(attr=='opacity'){
            //  特殊属性:opacity 0-1  变成0-100
            var current = parseInt(getStyle(dom,'opacity')*100)
        }else{
            var current = parseInt(getStyle(dom,attr));
        }                
        
        //2 设置速度:剩余路程/10
        var speed = target>current?Math.ceil((target - current)/10):Math.floor((target - current)/10)
        //3 计算元素下一个位置
        var next = current + speed;
        //4 有条件的定位
        if(target==next){
            //给属性赋值,要分情况
            if(attr == "opacity"){
                //target是乘以100的结果,赋值的时候要除以100
                //浏览器的兼容问题
                dom.style.opacity = target/100;
                dom.style.filter = "alpha(opacity="+target+")";
            }else{
                dom.style[attr] = target+"px";
            }                    
            clearInterval(dom.timer);
            fn&&fn()
        }else{
            if(attr == "opacity"){
                //target是乘以100的结果,赋值的时候要除以100
                //浏览器的兼容问题
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")";
            }else{
                dom.style[attr] = next+"px";
            }  
        }
    },1000/60)
}


function move4(dom,json,fn){            
    //要用定时器,先清定时器
    clearInterval(dom.timer)
    //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function(){   
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for(var attr in json){
            //attr.1 获取元素当前位置
            var current = parseInt(getStyle(dom,attr));
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if(next==target){
                dom.style[attr] = target+"px";
                // clearInterval(dom.timer)
            }else{
                dom.style[attr] = next+"px";
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if(flag){
            clearInterval(dom.timer);
            fn&&fn();

        }

        
    },1000/60)
}


function move5(dom,json,fn){            
    //要用定时器,先清定时器
    clearInterval(dom.timer)
    //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function(){   
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for(var attr in json){
            //attr.1 获取元素当前位置
            if(attr == "opacity"){
                var current = parseInt(getStyle(dom,'opacity')*100);
            }else{
                var current = parseInt(getStyle(dom,attr));
            }            
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if(next==target){
                if(attr=="opacity"){
                    dom.style.opacity = target/100;
                    dom.style.filter = 'alpha(opacity='+target+')';
                }else{
                    dom.style[attr] = target+"px";
                }                
            }else{
                if(attr=="opacity"){
                    dom.style.opacity = next/100;
                    dom.style.filter = 'alpha(opacity='+next+')';
                }else{
                    dom.style[attr] = next+"px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if(flag){
            clearInterval(dom.timer);
            fn&&fn();

        }

        
    },1000/60)
}

//完美版运动函数
//如果有的属性无需缓动,直接一步到位,需要你进行处理,比如zIndex
function animation(dom,json,fn){            
    //要用定时器,先清定时器
    clearInterval(dom.timer)
    //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function(){   
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for(var attr in json){
            //attr.1 获取元素当前位置
            if(attr == "opacity"){
                var current = parseInt(getStyle(dom,'opacity')*100);
            }
            else if(attr=='zIndex'){
                var current = json['zIndex'];//如果是zIndex,直接到位
            }
            else{
                var current = parseInt(getStyle(dom,attr));
            }            
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if(next==target){
                if(attr=="opacity"){
                    dom.style.opacity = target/100;
                    dom.style.filter = 'alpha(opacity='+target+')';
                }
                else if(attr=='zIndex'){
                    dom.style.zIndex = target;
                }
                else{
                    dom.style[attr] = target+"px";
                }                
            }else{
                if(attr=="opacity"){
                    dom.style.opacity = next/100;
                    dom.style.filter = 'alpha(opacity='+next+')';
                }else{
                    dom.style[attr] = next+"px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if(flag){
            clearInterval(dom.timer);
            fn&&fn();

        }

        
    },1000/60)
}