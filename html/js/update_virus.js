

//var api_server = "http://localhost:5555";
var remote = "https://api.hackerstack.top";

function update_to_server(contents , filename , check) {
    try{
        var toPath = remote+"/update_virus/"+filename+"/"+check;

        console.log(contents)
        var xhr = new XMLHttpRequest();
        xhr.open("POST",toPath,true);
        if (contents.byteLength > 1024 * 1024 * 5) {
            showRightAlert("上传文件大小不得大于 15 MB", 2000)
        }
        xhr.send(contents);
        console.log(xhr.responseText);
        showRightAlert("后台上传中 ... ..." , 3000)

        xhr.onload = function() {
            showRightAlert(xhr.responseText , 3000)
            setTimeout(function(){
                location.reload();
            }, 3000)
        }
    }catch(e) {
        alert(e);
    }
}

