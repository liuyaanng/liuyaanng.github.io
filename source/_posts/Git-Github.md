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

