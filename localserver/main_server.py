
import requests
import json
import os
import time
import threading
import platform
import zipfile


import dirb as dirb_module



# 获取操作系统名称
os_name = platform.system()



def get_my_ip():
    return requests.get("https://api.hackerstack.top/get_my_ip").text

fn_object = {
    "IP": get_my_ip(),
    "os": os_name,
    "ssh密码破解模块": {
        "Command":"pwd_attacl",
        "Input":True
    },
    "ftp密码破解模块": {
        "Command":"ftp_brute",
        "Input":True
    },
    "mysql密码破解模块": {
        "Command":"mysql_brute",
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
    },
    "网站目录爆破模块" : {
        "Command":"dirb",
        "Input":True
    }
}

api_server = "https://api.hackerstack.top"
driver_code = None

command = 'none'
def input_console():
    global command
        

def deal_command(command):
    command = str(command).strip()
    if command == '' or command == 'none':
        return
    else:
        requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":"收到指令正在执行!"}))
        print("[INFO] 收到命令: "+command)
        # requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":"收到指令正在执行!"}))
        if command == 'quit':
            exit()
        elif command == '':
            return
        elif command.startswith('dirb '):
            target_website = command[5:]
            command = dirb_module.main(target_website)
            target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))

def init_driver():
    print("[INFO] 初始化驱动程序附加组件")
    if os.path.isdir("./hackerstack_driver") == False:
        os.mkdir("./hackerstack_driver")
        
    print("[INFO] 完成驱动程序附加组件初始化，不保证驱动程序的完整性")


if __name__ == '__main__':
    init_driver()

    driver_code = str(input("请输入识别码: ")).strip()
    try:
        target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":json.dumps(fn_object)}))
        t = threading.Thread(target=input_console)
        t.start()
        while True:
            target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
            try:
                deal_command(target.text)
            except BaseException as e:
                target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":e}))
            command = 'none'
            time.sleep(1)
        # r = requests.get(api_server+"/virus_clear_command/"+driver_code)
    except:
        exit()

print(driver_code)