import requests
from concurrent.futures import ThreadPoolExecutor

result = []

def scan_directory(url):
    try:
        response = requests.get(url)
        if response.status_code == 200 or response.status_code == 403 or response.status_code == 405:
            print(f"[+] Scanning - {url}")
            result.append (f"[+] Found - {url}")
    except requests.exceptions.RequestException as e:
        print(f"[-] Error - {e}")

def main(target_url):
    wordlist = open("./hackerstack_driver/dic.txt", "r").readlines()
    with ThreadPoolExecutor(max_workers=2000) as executor:
        for dir in wordlist:
            executor.submit(scan_directory, f"{target_url}/{dir}")

        executor.shutdown(wait=True)

    # 列表转换成字符串
    result_str = "\n".join(result)
    return result_str