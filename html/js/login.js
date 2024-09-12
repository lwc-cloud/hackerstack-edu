// 154.9.253.147
//var remote = 'http://127.0.0.1:11111/'
var remote = 'https://user.hackerstack.top'

function login() {
    var user = document.getElementById("user");
    var pwd = document.getElementById("pwd");

    var t = document.getElementById("wait");
    t.style.display = "block"
    try{
        var username =  user.value;
        var password = pwd.value;
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST" , remote+"/api/v2/login",true);
        xhr.send(JSON.stringify({"user":username,"pwd":password}));
        xhr.onload=function() {
        // 返回的是 Json字符串，自己去处理,默认的信息是 {"message":"login successful."}
        var json_content = xhr.responseText;
        var json = JSON.parse(json_content);
        if (json['message'] == "login successful.") {
            setCookie("user",username,7);
            setCookie("pwd",password,7);
            window.location.href = "/";
            return true;
        } else {
            showRightAlert ("登录错误: 用户名或者密码错误" , 3000);
            t.style.display='none'
            return false; 
        }
        }
    } catch(e) {
        showRightAlert ("登录错误: "+e , null);
    }
}