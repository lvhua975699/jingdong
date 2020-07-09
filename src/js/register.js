document.write("<script type='text/javascript' src='../lib/jquery/jquery-1.12.4.js'></script>"); 

 //1.1 获取所有元素
 var allInp = $('input');
 var unInp = allInp[0];//用户名输入框
 var pwInp = allInp[1];//密码输入框
 var registerBtn = allInp[2];//注册按钮
 var span = $('span');
console.log(span);
// 正则验证  
 var usernameReg = /^[^_].{5,11}$/
 var passwordReg = /^\w{6,12}$/  
 for (var i = 0; i < allInp.length; i++) {
  allInp[i].addEventListener('input', function (e) {
        e = e || e.event;
      // 3-1. 判断是哪一个元素触发的事件
      var eleId = this.id
      // 3-2. 提前准备一个变量, 用来表示错误或者正确
      var flag = false;
      // 开始判断
      switch (eleId) {
        case 'login':
          flag = usernameReg.test(this.value)
          break
        case 'pwd':
          flag = passwordReg.test(this.value)
      }
      span.css({display:'none'});
      // 3-2. 当判断结束的时候
      this.parentElement.className = flag ?'':'active';
      if(flag){
        //1.2 点击登陆,提交信息
       registerBtn.onclick = function(){
          var xhr = new XMLHttpRequest();
          //1.2.2 初始化请求
          xhr.open('post','../servers/register.php');
  
          //1.2.3 设置请求头
          xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
          //1.2.3 发送请求主体
          xhr.send('username='+unInp.value+'&password='+pwInp.value);
          
          //1.2.4 等待响应完成
          xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200){
              span.html('注册成功！即将跳转登陆页面!').css({color:'green',display:'block'});
              location.href = "../pages/login.html";
            }
          }
        }
      }else{
        registerBtn.onclick = function(){
          span.css({display:'block'});
        }
      }
    })
  }


//  //1.2 点击登陆,提交信息
//  registerBtn.onclick = function(){
//     var xhr = new XMLHttpRequest();
//     //1.2.2 初始化请求
//     xhr.open('post','../servers/register.php');

//     //1.2.3 设置请求头
//     xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//     //1.2.3 发送请求主体
//     xhr.send('username='+unInp.value+'&password='+pwInp.value);
    
//     //1.2.4 等待响应完成
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState==4&&xhr.status==200){
           
//         }
//     }
//  }