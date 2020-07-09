
var nullshow = $('.null');
var shopshow = $('.shop');
var shopview = $('.shopview');
var zongji = $('.allprice').children()[0];

if(!shopview.children()[0]){
    nullshow.css({
        display:'block'
    });
    shopshow.css({
        display:'none'
    });
}
    // 购物车页面显示加入购物车的商品
    $.get('../interface/showlist.php',function(data){
        var json = JSON.parse(data);
        // console.log(json);
        // console.log(json.data[0].product_img);
        if(json.code==0){
            nullshow.css({
                display:'block'
            });
            shopshow.css({
                display:'none'
            });
        }else{
            // alert('你买了的东西是'+JSON.stringify(json.data))
            nullshow.css({
                display:'none'
            });
            shopshow.css({
                display:'block'
            });
            $.each(json.data,function(index,value){

                var he = parseInt(json.data[index].product_price)*json.data[index].product_num;
                var str =  `<h3><input type="checkbox"> 官方旗舰店</h3>
                            <h4>
                                <input type="checkbox" class="check"><img src="${json.data[index].product_img}" alt="">
                                <span>${json.data[index].product_name}</span><em class="danjia">￥${json.data[index].product_price}</em><i><button class="cutNum" index="${json.data[index].product_id}">-</button><input type="text" value="${json.data[index].product_num}" class="textfresh" index="${json.data[index].product_id}"><button class="addNum" index="${json.data[index].product_id}">+</button></i>
                                <em class="zongji">￥${he}</em><button class="delProduct" index="${json.data[index].product_id}">删除</button>
                            </h4>`
                shopview.append(str);
                he +=he;
                zongji.innerHTML = he;
            })
        }


            // 删除购物车里面的指定id的商品
            $('.delProduct').click(function(){
                $(this).parent().prev().remove();
                $(this).parent().remove();
                console.log(shopview.children()[0]);
                if(!shopview.children()[0]){
                    nullshow.css({
                        display:'block'
                    });
                    shopshow.css({
                        display:'none'
                    });
                }
                $.get('../interface/delwq.php',{
                    id:$(this).attr('index')
                },function(data){
                    var json = JSON.parse(data);
                    if(json.code==1){
                        // alert('商品删除成功')
                       
                        // setTimeout(myrefresh(),10); //指定1秒刷新一次
                    }
                })
  
            })
        
            // 更新商品数量之增加
            $('.addNum').click(function(){
                var that =this;
                var zj = (parseInt($(this).prev().attr('value'))+1)*$(this).parent().prev().html().substring(1)
                $(this).parent().next().html("￥"+zj);
                $.get('../interface/updatewq.php',{
                    id:$(this).attr('index'),
                    type:'add'
                },function(data){
                    var json = JSON.parse(data);
                    if(json.code==1){
                       $(that).prev().attr('value',json.num);
                    //    setTimeout(myrefresh(),10); //指定1秒刷新一次
                    }
                })
            })
            
        
            // 更新商品数量之减少
      
        $('.cutNum').click(function(){
            var that =this;
            var zj = (parseInt($(this).next().attr('value'))-1)*$(this).parent().prev().html().substring(1)
            $(this).parent().next().html("￥"+zj);
            if($(that).next().attr('value')<=1){
                $(that).next().attr('value',1)             
            }else{
                var that =this;
                $.get('../interface/updatewq.php',{
                    id:$(this).attr('index'),
                    type:"cut"
                },function(data){
                    var json = JSON.parse(data);
                    if(json.code==1){
                       $(that).next().attr('value',json.num);
                    }
                })
            }            
        })


    })
     // 登录同步
     var login = $('.login').parent();
     if(window.sessionStorage.name){
         login.html('欢迎您      '+window.sessionStorage.name);
         console.log(login);
     }
     
     var jishu = $('.shopview').children().prevObject[0];
     console.log(jishu);