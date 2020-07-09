document.write("<script type='text/javascript' src='../lib/jquery/jquery-1.12.4.js'></script>"); 

 //1.1 获取所有元素
 var allInp = $('input');
 var unInp = allInp[0];//用户名输入框
 var pwInp = allInp[1];//密码输入框
 var loginBtn = allInp[2];//登录按钮
 var em = $('em');
 //1.2 点击登陆,提交信息
loginBtn.onclick = function(){
    var xhr = new XMLHttpRequest();
    //1.2.2 初始化请求
    xhr.open('post','../servers/login.php');

    //1.2.3 设置请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //1.2.3 发送请求主体
    xhr.send('username='+unInp.value+'&password='+pwInp.value);
    
    //1.2.4 等待响应完成
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var json = JSON.parse(xhr.responseText);//{code:1}
            console.log(json.code);
                    if(json.code==1){
                        window.sessionStorage.name = json.name;
                        em.html('登录成功，即将跳转至主页面！').css({color:'green',display:'block'});
                        location.href = "../pages/index.html";

                    }else{
                        em.css({display:'block'});
                    }
        }
    }
 }