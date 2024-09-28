import requests
from concurrent.futures import ThreadPoolExecutor, as_completed, wait

class Dirb:
    result = []

    def get_result(self):
        return self.result

    def scan_directory(self, url):
        try:
            response = requests.get(url, timeout=4)  # 设置单个请求的超时时间

            if response.status_code == 200 or response.status_code == 403 or response.status_code == 401:
                print(f"[+] [{response.status_code}] Scanning - {url}")
                self.result.append(f"[+] [{response.status_code}] Scanning - {url}")
        except requests.exceptions.RequestException as e:
            print(f"[-] Error - {e}")
            self.result.append(f"[-] Error - {e}")
            pass  # 这里不需要添加到结果列表中，因为这是一个异常

    def CommandDirb(self, target_url):
        host = target_url
        if '&' in host or '>' in host or '<' in host or '<' in host or '?' in host or '=' in host or '#' in host:
            return 'NULL'
        wordlist = open("./dic.txt", "r").readlines()
        wordlist = [dir.strip() for dir in wordlist]  # 去除每行末尾的换行符

        with ThreadPoolExecutor(max_workers=3000) as executor:
            # 提交所有任务
            futures = [executor.submit(self.scan_directory, f"{target_url}{dir}") for dir in wordlist]

            # 等待所有任务完成或超时
            done, not_done = wait(futures, timeout=60)

            # 处理未完成的任务
            for future in not_done:
                future.cancel()

            # 获取已完成任务的结果
            for future in done:
                try:
                    result = future.result()
                    if result:
                        print(result)
                except Exception as exc:
                    print(f"Task generated an exception: {exc}")
                    pass

import sys
import threading
import time

def t():
    time.sleep(30)
    exit(0)

'''
# 使用示例
if __name__ == "__main__":
    target_url = sys.argv[1]
    t1 = threading.Thread(target=t)
    t1.start()
    dirb = Dirb()
    dirb.CommandDirb(target_url)
'''