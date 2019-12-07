---
title: Git & Github
top: false
cover: false
toc: true
mathjax: false
img: https://i.loli.net/2019/09/19/wc3vfPElWsXKTGV.jpg
date: 2019-09-18 16:21:29
password:
summary: Some problems in GitHub & Git.
tags:
- Git
- Github
categories:
---

### 1. When i download files from GitHub, `Failed to connect to 127.0.0.1 port 1080: Connection refused`

1. Find wheather you are using proxy server or not.

```bash
git config --global http.proxy
```

2. Cancel the proxy server.

```bash
git config --global --unset http.proxy
```

### 2. Clone with SSH ([Github guide](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh))
- Install Openssh

```bash
sudo pacman -S openssh
```
- Generating a new SSH key

```bash
ssh-keygen
```

![](https://i.loli.net/2019/12/06/foZjquaH75Jnw3Y.png) 

```bash
tree .ssh
```

![](https://i.loli.net/2019/12/06/oKIUzYLRcp4OhyE.png) 

- Copy the SSH key to your clipboard

```bash
cat .ssh/id_rsa.pub
```

- In the upper-right corner of any page, click your profile photo, then click **Settings**

![](https://i.loli.net/2019/12/06/hIA7KpbfmYMJ14j.png)

- In the user settings sidebar, click **SSH and GPG keys**

- Click **New SSH key** or **Add SSH key**.

- In the "Title" field, add a descriptive label for the new key. For example, if you're using arch linux, you might call this key "Arch linux"

- Paste your key into the "Key" field.

![](https://i.loli.net/2019/12/06/vjZVS19MN2A4hoD.png) 

- If prompted, confirm your GitHub password.





