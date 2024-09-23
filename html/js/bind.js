
function bind_mail() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pwd").value;
    var email = document.getElementById("email").value;
    var check_code = document.getElementById("check").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://user.hackerstack.top/api/v2/bind_mail", true);
    xhr.send(JSON.stringify({
        "user": username,
        "pwd": password,
        "mail": email,
        "check": check_code
    }));
    xhr.onload = function() {
        showAlert(JSON.parse(xhr.responseText)['message'])  
    };
}

function send_mail() {
    try {
        var email = document.getElementById("email").value;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://user.hackerstack.top/api/v1/activation", true);
        xhr.send(JSON.stringify({
            "send_to": email
        }));
        xhr.onload = function() {
            showAlert(JSON.parse(xhr.responseText)['message'])  
        }
    }catch(e) {
        showAlert("错误：" + e.message+" 如果是跨域问题，则绑定任然是成功的")
    }
}

function login_with_mail() {
    var email = document.getElementById("email").value;
    var check = document.getElementById("check").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://user.hackerstack.top/api/v2/mail_login", true);
    xhr.send(JSON.stringify({
        "mail": email,
        "check": check
    }));
    xhr.onload = function() {
        var data = JSON.parse(xhr.responseText)['message'];
        showAlert(data , 1000)  
        if (data == 'login successful') {
            window.location.href = "/";
            setCookie("user", JSON.parse(xhr.responseText)['user']);
            setCookie("pwd", JSON.parse(xhr.responseText)['pwd']);
        }
    }
}