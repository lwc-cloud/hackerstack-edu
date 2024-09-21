function showAlert(message, waitTime) {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.right = '0';
    div.style.bottom = '0';
    div.style.left = '0';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.style.backdropFilter = 'blur(5px)';
    div.style.color = '#00FF00';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '16px';
    div.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
    div.style.margin = '200px auto';
    div.style.maxWidth = '600px';
    div.style.overflow = 'auto';
    div.style.height = '350px'
    div.style.border = '3px solid #00FF00'

    var title = document.createElement('p');
    title.innerText = '提示';
    title.style.fontSize = '15px'
    title.style.width = "calc(100% - 20px)";
    title.style.margin = '0px'
    title.style.padding = '10px';
    title.style.color = "black"
    title.style.backgroundColor = "#00FF00"
    div.appendChild(title);

    var messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messageDiv.style.marginTop = '0px';
    messageDiv.style.padding = '10px';
    messageDiv.style.width = "calc(100% - 20px)";
    messageDiv.style.height = "calc(100% - 120px)";
    messageDiv.style.overflowY = "scroll";
    messageDiv.style.overflowX = "hidden";
    messageDiv.innerHTML = message;

    div.appendChild(messageDiv);
    
    var closeButton = document.createElement('button');
    closeButton.style.position = 'absolute';
    closeButton.style.bottom = '10px';
    closeButton.style.border = '1px solid green';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#00FF00';
    closeButton.style.width='80px';
    closeButton.style.right = '10px'
    closeButton.innerText = "关闭";
    closeButton.onclick = function() {
        document.body.removeChild(div);
    };
    closeButton.onmouseenter=function(){
        closeButton.style.backgroundColor='#00FF00';
        closeButton.style.color='black'
    }
    closeButton.onmouseleave=function(){
        closeButton.style.backgroundColor='black';
        closeButton.style.color='green'
    }

    div.appendChild(closeButton);
    
    document.body.appendChild(div);
    
    if (waitTime != null) {
        setTimeout(function() {
            document.body.removeChild(div);
        }, waitTime);
    }
}

function showRightAlert(text, time) {
    // 创建警告框的容器
    var alertDiv = document.createElement('div');
    alertDiv.style.position = 'absolute';
    alertDiv.style.right = '10px';
    alertDiv.style.top = '10%';
    alertDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    alertDiv.style.backdropFilter = 'blur(5px)';
    alertDiv.style.color = 'white';
    alertDiv.style.padding = '16px';
    alertDiv.style.margin = '16px';
    alertDiv.style.borderRadius = '10px';
    alertDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.width = '0px';
    alertDiv.style.fontSize = '16px';
    alertDiv.style.minHeight = '100px';
    alertDiv.style.transition = 'all 0.3s ease';
    

    var t = document.createElement("p");
    t.innerText = text;
    alertDiv.appendChild(t);
    t.style.display='none'

    var close = document.createElement('button');
    close.style.position = 'absolute';
    close.style.top = '10px';
    close.style.right = '10px';
    close.style.border = 'none';
    close.style.backgroundColor = 'transparent';
    close.style.color = 'white';
    close.style.padding = '4px';
    close.style.cursor = 'pointer';
    close.innerText = 'X';
    close.onclick = function() {
        document.body.removeChild(alertDiv);
    };
    alertDiv.appendChild(close);
    document.body.appendChild(alertDiv);

    setTimeout(() => {
            alertDiv.style.width = '200px';
    }, 1);
    setTimeout(() => {
        t.style.display='block'
    }, 300);

    // 设置定时器，在指定时间后移除警告框
    if (time != null)
    {
        setTimeout(function() {
            t.style.display='none'
            alertDiv.style.width = '0px';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, time);
    }
}

function showAlert_Console(message, waitTime ,cellback) {
    // 可以显示信息在一个类似控制台的窗口中，不是 console.log
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.right = '0';
    div.style.bottom = '0';
    div.style.left = '0';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.style.backdropFilter = 'blur(5px)'; 
    div.style.color = 'white';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '16px';
    div.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
    div.style.margin = '200px auto';
    div.style.maxWidth = '600px';
    div.style.overflow = 'auto';
    div.style.height = '300px'
    div.style.border = '3px solid #00FF00'

    var title = document.createElement('p');
    title.innerText = '提示';
    title.style.fontSize = '15px'
    title.style.width = "calc(100% - 20px)";
    title.style.margin = '0px'
    title.style.padding = '10px';
    title.style.color = "black"
    title.style.backgroundColor = "#00FF00"
    div.appendChild(title);

    var messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messageDiv.style.marginTop = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.innerHTML = message;

    div.appendChild(messageDiv);
    
    var closeButton = document.createElement('button');
    closeButton.style.position = 'absolute';
    closeButton.style.bottom = '10px';
    closeButton.style.border = '1px solid green';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#00FF00';
    closeButton.style.width='80px';
    closeButton.style.right = '10px'
    closeButton.innerText = "关闭";
    closeButton.onclick = function() {
        document.body.removeChild(div);
    };
    closeButton.onmouseenter=function(){
        closeButton.style.backgroundColor='#00FF00';
        closeButton.style.color='black'
    }
    closeButton.onmouseleave=function(){
        closeButton.style.backgroundColor='black';
        closeButton.style.color='green'
    }

    div.appendChild(closeButton);
    
    document.body.appendChild(div);

    cellback(message);

    if (waitTime != null) {
        setTimeout(function() {
            console.log("alert closed");
        }, waitTime);    
    }
}

function showInputBox(title,cmd_type, message, callback) {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.right = '0';
    div.style.bottom = '0';
    div.style.left = '0';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.style.backdropFilter = 'blur(5px)';
    div.style.color = 'white';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '16px';
    div.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
    div.style.margin = '200px auto';
    div.style.maxWidth = '600px';
    div.style.overflow = 'auto';
    div.style.height = '300px'
    div.style.border = '3px solid #00FF00'

    var titleDiv = document.createElement('p');
    titleDiv.innerText = title;
    titleDiv.style.fontSize = '15px'
    titleDiv.style.width = "calc(100% - 20px)";
    titleDiv.style.margin = '0px'
    titleDiv.style.padding = '10px';
    titleDiv.style.color = "black"
    titleDiv.style.backgroundColor = "#00FF00"
    div.appendChild(titleDiv);

    var messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messageDiv.style.marginTop = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.innerHTML = message;

    div.appendChild(messageDiv);

    var inputDiv = document.createElement('div');
    inputDiv.style.marginTop = '20px';
    inputDiv.style.padding = '10px';
    inputDiv.style.display = 'flex';
    inputDiv.style.alignItems = 'center';
    inputDiv.style.justifyContent = 'center';

    var input = document.createElement('input');
    input.style.padding = '5px';
    input.style.border = '1px solid white';
    input.style.borderRadius = '5px';
    input.style.marginRight = '10px';
    input.style.width = '200px';
    input.style.color = 'white';
    input.style.backgroundColor = 'transparent';
    input.style.outline = 'none';
    input.style.resize = 'none'; 
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            callback(input.value);
            document.body.removeChild(div);
        }
    });
    inputDiv.appendChild(input);

    var button = document.createElement('button');
    button.style.padding = '5px';
    button.style.border = '1px solid white';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = 'transparent';
    button.style.color = 'white';
    button.style.marginLeft = '10px';
    button.innerText = '确定';
    button.addEventListener('click', function() {
        callback(cmd_type+input.value);
        document.body.removeChild(div);
    });
    inputDiv.appendChild(button);

    div.appendChild(inputDiv);

    document.body.appendChild(div);
}