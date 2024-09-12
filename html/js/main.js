
var remote = 'https://user.hackerstack.top'

function load_index_text() {

    auto_login()

    var t = document.getElementById('t');
    var text_1 = `
Hacker Stack系统并不是一个界面效果或者是一个用来装逼的工具。而是一个真实允许初学者利用各种可视化或者是半可视化工具便可以
完成渗透测试的在线网站
    `
    var splitText_1 = text_1.split('');

    var run = null;
    var i = 0;
    run = setInterval(function() {
        i++
        if (i + 1 == text_1.length) {
            clearInterval(run);
            return;
        }
        if (splitText_1[i] == "\n") {
            t.innerHTML+= "<br />";
        }else {
            t.innerHTML+= "<a style='color:red'>"+splitText_1[i]+"</a>";
        }
    } , 100);
}

function default_login() {
    document.cookie = '{"user" : "linux" , "pwd" : "linux"}'
    showAlert("成功以访客身份登录最好注册一个，因为有一些服务是互通的，访客账户账户密码都是开放的，无法保证任何的服务安全" , null);
    setTimeout(function() {
        window.location.href = ''
    }, 5000);
}

window.onload = function() {
    load_index_text()
}

function login_ok(to_system , showAlert) {
    var get_result = false;
    try {
        var username = getCookie("user");
        var password = getCookie("pwd");
        if (username == "" || password == "") {
            showRightAlert("请先登录" , 3000)
        }
        else {
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST" , remote+"/api/v2/login",true);
            xhr.send(JSON.stringify({"user":username,"pwd":password}));
            
            xhr.onload=function() {
            // 返回的是 Json字符串，自己去处理,默认的信息是 {"message":"login successful."}
            var json_content = xhr.responseText;
            var json = JSON.parse(json_content);
            if (json["message"] == "login successful.") {
                setCookie("user" , username);
                setCookie("pwd" , password);
                
                var login_btn = document.getElementById('login');
                login_btn.innerText = "登录: "+username;
                login_btn.onclick = function() {
                        window.location.href = "./user.html";
                    }
                    to_system()
                    return true;
                } else {
                    showAlert("请先登录" , null)
                    return false; 
                }
            }
        }
        return get_result;
    }catch (e) {
        showAlert("请先登录" , null)
        return get_result;
    }
}


function auto_login() {

    try{
        var username =  getCookie("user");
        var password = getCookie("pwd");
        console.log(username , password)
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST" , remote+"/api/v2/login",false);
        xhr.send(JSON.stringify({"user":username,"pwd":password}));
        
        // 返回的是 Json字符串，自己去处理,默认的信息是 {"message":"login successful."}
        var json_content = xhr.responseText;
        var json = JSON.parse(json_content);
        if (json["message"] == "login successful.") {
            showRightAlert("欢迎回来，"+username , 3000)
            setCookie("user" , username , 7);
            setCookie("pwd" , password , 7);
            
            var login_btn = document.getElementById('login');
            login_btn.innerText = "登录: "+username;
            login_btn.onclick = function() {
                window.location.href = "./user.html";
            }
            var top = document.getElementById('top');
            var exit_login = document.createElement('a');
            exit_login.onclick=function() {
                setCookie("user","None");
                setCookie("pwd","None")
                window.location.href=''
            }
            exit_login.innerText = '退出登录'
            top.appendChild(exit_login);
            document.getElementById('default_login').style.display = 'none'
            return true;
        } else {
            showRightAlert("还未登录，请先登录" , 3000)
            return false; 
        }
    } catch(e) {
        return false;
    }
}