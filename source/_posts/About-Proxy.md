---
title: About Proxy
top: false
cover: false
toc: true
mathjax: true
date: 2020-02-01 23:14:57
img: https://i.loli.net/2020/02/02/HvfDTFuE48MARon.png
password:
summary: SSR OR V2RAY?
tags:
categories:
---


# About Proxy


~~Script: [SSR](https://github.com/liuyaanng/SSR)~~  SSR seems very unstable, i use **v2ray** now.

Ping test: [ping](http://ping.chinaz.com/) 

![Youtube speed](1.png) 

## V2Ray

Preconditions:
- a VPS: [vultr](https://www.vultr.com/)($5/m i uesd now) , [VIRMACH](https://billing.virmach.com/cart.php)($1.25/m)
- a Domain: ([Namesilo](https://www.namesilo.com/)($0.99), [Freenom](https://www.freenom.com/)(free) )
- OS version: Debian 9+ / Ubuntu 18.04+ / CentOS 7+

### 1. Resolve the domain to the IP of your VPS

[Cloudflare](https://www.cloudflare.com/) 

#### 1. Add site

![](2.png) 

#### 2. Change your domain NS

![](5.png) 

![](3.png) 

![](4.png) 

#### 3. Add record

![](6.png) 

You can light the cloud icon to use a proxy which can hidden real ip. 

NOTE: **Do it after installed V2Ray if u need it**

#### 4. Ping

![](7.png) 

it works.

### 2. Set BBR lotserver

```bash
wget --no-check-certificate https://raw.githubusercontent.com/liuyaanng/SSR/master/tcp.sh && chmod +x tcp.sh && ./tcp.sh
```

![](8.png) 

### 3. Install V2Ray

There are two way to install V2Ray use different methods.

- Vmess+websocket+TLS+Nginx+Website

```bash
bash <(curl -L -s https://raw.githubusercontent.com/wulabing/V2Ray_ws-tls_bash_onekey/master/install.sh) | tee v2ray_ins.log
```

- Vmess + HTTP2 over TLS

```bash
bash <(curl -L -s https://raw.githubusercontent.com/wulabing/V2Ray_ws-tls_bash_onekey/master/install_h2.sh) | tee v2ray_ins_h2.log
```

![](9.png) 

SELF TESTING

### 4. Run V2Ray

- start v2ray: `systemctl start v2ray`
- stop v2ray: `systemctl stop v2ray`
- start nginx: `systemctl start nginx`
- stop nginx: `systemctl stop nginx`


## 5. V2Ray client

- Windows: 
  - [V2RayN](https://tlanyan.me/download.php?filename=/v2/windows/v2rayN-v3.5.zip) 
- MacOS:
  - [V2RayU](https://tlanyan.me/download.php?filename=/v2/macos/v2rayU-v1.5.1.dmg) 
- Linux:
  - [link](https://www.jianshu.com/p/a5b6d9dc0441) 
  - Configuration V2Ray
  
   config file is located in `/etc/v2ray/config.json`
```
{
  "policy": null,
  "log": {
    "access": "",
    "error": "",
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "tag": "proxy",
      "port": 1080,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      },
      "settings": {
        "auth": "noauth",
        "udp": true,
        "ip": null,
        "address": null,
        "clients": null
      },
      "streamSettings": null
    }
  ],
  "outbounds": [
    {
      "tag": "proxy",
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": " ", //your domain address
            "port":  ,   //port
            "users": [
              {
                "id": " ",   //id
                "alterId": 2,
                "email": "t@t.tt",
                "security": "auto"
              }
            ]
          }
        ],
        "servers": null,
        "response": null
      },
        "streamSettings": {
        "network": "ws",
        "security": "tls",
        "tlsSettings": {
          "allowInsecure": true,
          "serverName": " "    //domain address
        },
        "tcpSettings": null,
        "kcpSettings": null,
        "wsSettings": {
          "connectionReuse": true,
          "path": "/e3137ae7/",   //path
          "headers": {
            "Host": " "  //domain address
          }
        },
        "httpSettings": null,
        "quicSettings": null
      },
      "mux": {
        "enabled": true,
        "concurrency": 8
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {
        "vnext": null,
        "servers": null,
        "response": null
      },
      "streamSettings": null,
      "mux": null
    },
    {
      "tag": "block",
      "protocol": "blackhole",
      "settings": {
        "vnext": null,
        "servers": null,
        "response": {
          "type": "http"
        }
      },
      "streamSettings": null,
      "mux": null
    }
  ],
  "stats": null,
  "api": null,
  "dns": null,
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "type": "field",
        "port": null,
        "inboundTag": [
          "api"
        ],
        "outboundTag": "api",
        "ip": null,
        "domain": null
      }
    ]
  }
}
```

  
## Terminal Proxy

### proxychains

i can make some terminal commands run with proxy. But it seems can't work on my computer. Sad. Anyway, i still share the way to install and configure.

- Installation

```bash
sudo pacman -S proxychains
```

Or you can install it from source code. (make sure your `gcc` installed)


```bash
git clone https://github.com/rofl0r/proxychains-ng
cd proxychains-ng
./configure
sudo make && make install
sudo make install-config(generate config file)
```

- Configuration
config file is saved in `/etc/proxychains.conf`

Add `socks5  127.0.0.1 1080` to the end. note the space!

- Use

Add `proxychains` before the terminal commands.

```bash
proxychains git clone https://github.com/rofl0r/proxychains-ng
```

you can run `npm` , `docker` ... But `ping` command is not suitable, because proxychains can only proxy **TCP**, and `ping` is use **ICMP**.

### git

You may need to configure a proxy server if you're having trouble cloning or fetching from a remote repository or getting an error like unable to access `Couldn't resolve host`.

Consider something like:

```bash
git config --global http.proxy http://proxyUsername:proxyPassword@proxy.server.com:port
```

i use ` git config --global http.proxy 'socks5://127.0.0.1:1080' ` to set my git cause i use socks5.

i also use ` git config --local http.proxy 'socks5://127.0.0.1:1080'` to set my local config that can only work in 'git clone' repositories.

Check global proxy:

```bash
git config --global http.proxy
```

Check local proxy:

```bash
git config --local http.proxy
```

Cancel proxy:

```bash
git config --global --unset http.proxy
```

```bash
git config --local --unset http.proxy
```

### wget

Create `.wgetrc` file in home directory.

```bash
use_proxy=yes
http_proxy=127.0.0.1:1080
https_proxy=127.0.0.1:1080
```

it can only use http proxy.




