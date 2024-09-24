import requests
from concurrent.futures import ThreadPoolExecutor

result = []

def scan_directory(url):
    try:
        response = requests.get(url)

        if response.status_code != 404 and response.status_code != 400:
            print(f"[+] [{response.status_code}] Scanning - {url}")
            result.append (f"[+] [{response.status_code}] Scanning - {url}")
    except requests.exceptions.RequestException as e:
        print(f"[-] Error - {e}")
        result.append (f"[+] [{response.status_code}] Scanning - {url}")

def main(target_url):
    wordlist = open("./hackerstack_driver/dic.txt", "r").readlines()
    j = 0
    f = None
    with ThreadPoolExecutor(max_workers=2000) as executor:
        for dir in wordlist:  
            #print(j) 
            f = executor.submit(scan_directory, f"{target_url}{dir}")

        executor.shutdown(wait=True)

    # 列表转换成字符串
    result_str = "\n".join(result)
    return result_str