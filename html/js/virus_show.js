
var remote = "http://localhost:5555";
// var remote = "https://api.hackerstack.top";

function load_virus_list() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET" , remote+"/get_virus_list" , true);
    xhr.send();
    var virus_show = document.getElementById('virus_show');
    xhr.onload = function() {
        virus_show.innerHTML = '';
        var content = xhr.responseText;
        var content_split = JSON.parse(content);
        for (var key in content_split) {
            (function(file_name) {
                if (file_name != '') {
                    var btn = document.createElement('button');
                    btn.innerText = file_name;
                    btn.id = file_name;
                    btn.className = 'btn_1';
                    btn.style.width='100%';
                    virus_show.appendChild(btn);

                    btn.onclick = function()
                    {
                        var a = document.createElement('a');
                        a.download = remote+"/get_virus/"+btn.id;
                        a.href = remote+"/get_virus/"+btn.id
                        a.click();
                    }
                }
            }) (content_split[key])
        }
    }
}

window.onload = function() {
    document.getElementById('update_file').addEventListener('change', function(event) {  
        var file = event.target.files[0];  
        var reader = new FileReader();  
        var check = document.getElementById('check').value;

        if (file != null) {
            reader.onload = function(event) {  
                var contents = event.target.result;  
                var update = document.getElementById("update");
                update.onclick = function()
                  {
                      update_to_server(contents , file.name , check);
                  }
              };  
        }
        
        reader.readAsArrayBuffer(file);
      }, false);
    load_virus_list();
}