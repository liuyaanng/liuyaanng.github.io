---
title: About Proxy
top: false
cover: false
toc: true
mathjax: true
date: 2020-02-01 23:14:57
img: https://sm.ms/image/rgcG5ebztwOZpTy.jpg
password:
summary:
tags:
categories:
---


## About Proxy

VPS: [vultr](https://www.vultr.com/) 

Script: [SSR](https://github.com/liuyaanng/SSR) 

Ping test: [ping](http://ping.chinaz.com/) 

![Youtube speed](1.png) 

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




