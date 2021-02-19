---
title: LeetCode-CLI
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-02-10 12:00:42
updatedate: 2021-02-10 12:00:42
img: https://github.com/skygragon/leetcode-cli/raw/master/docs/logo.png
password:
summary: 如何优雅的刷LeetCode
tags:
- LeetCode
categories:
---

由于我有长期使vim的习惯, 在刷leetcode题时,在网页上写代码实在是有点难受, [LeetCode-cli](https://github.com/skygragon/leetcode-cli) 完美解决了我的问题. 

leetcode支持本地缓存题目,写代码,测试以及提交到`leetcode.com`.

![LeetCode-cli](https://github.com/skygragon/leetcode-cli/raw/master/docs/screenshots/intro.2018.01.13.gif)     

下面记录一下配置`leetcode-cli`

## 1. 安装

- 下载稳定版本,并非开发版本. [Install guide](https://skygragon.github.io/leetcode-cli/install) 
```bash
npm install -g leetcode-cli
```

## 2. 使用
所有用法wiki介绍的很详细, 自己探索吧哈哈哈! 

后续发现什么骚操作了再来这里分享

## 问题汇总
**一:  连接不到`leetcode`和`leetcode.cn`服务器,都会报`invalid password`的`error`**    
解决方案如下:  参考
[https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478#issuecomment-564757098](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478#issuecomment-564757098) 

1. 确保已安装`Node.js 8+`
2. 
```bash
# to remove the old version
npm uninstall -g leetcode-cli
# to install the up-to-date version(2.6.17+)
npm install -g leetcode-tools/leetcode-cli
```
使用`leetcode version`确保版本2.6.17+    
3. 使用`cookie`登陆
这个版本中包含了很多种登陆方式    

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210210222559.png)
若使用账号密码无法登陆,可尝试使用`Cookie`登陆, 具体方式如下:    
以`chrome`浏览器为例:    
- 登陆[leetcode]() , 打开 **`检查`** 
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210210223002.png)
- 选择 `network` -> `XHR` -> `search` -> `uid` -> `all/`
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210210223441.png)

- 使用`leetcode user -c`, 输入`user`, 再将`cookie`粘贴就ok了![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210210231428.png)

**2. 使用`leetcode.cn`, 用`leetcode show`命令出现`http error`**     
解决办法: 参考[https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/489](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/489) 
- 找到`leetcode.cn.js`文件, **MacOS** 一般在`/usr/local/lib/node_modules/vsc-leetcode-cli/lib/plugins/leetcode.cn.js`
- 替换成以下代码:

```js
'use strict'
var request = require('request');
var config = require('../config');
var h = require('../helper');
var log = require('../log');
var Plugin = require('../plugin');
var session = require('../session');
//
// [Usage]
//
// https://github.com/skygragon/leetcode-cli-plugins/blob/master/docs/leetcode.cn.md
//
var plugin = new Plugin(15, 'leetcode.cn', '2018.11.25',
    'Plugin to talk with leetcode-cn APIs.');
plugin.init = function() {
  config.app = 'leetcode.cn';
  config.sys.urls.base            = 'https://leetcode-cn.com';
  config.sys.urls.login           = 'https://leetcode-cn.com/accounts/login/';
  config.sys.urls.problems        = 'https://leetcode-cn.com/api/problems/$category/';
  config.sys.urls.problem         = 'https://leetcode-cn.com/problems/$slug/description/';
  config.sys.urls.graphql         = 'https://leetcode-cn.com/graphql';
  config.sys.urls.problem_detail  = 'https://leetcode-cn.com/graphql';
  config.sys.urls.test            = 'https://leetcode-cn.com/problems/$slug/interpret_solution/';
  config.sys.urls.session         = 'https://leetcode-cn.com/session/';
  config.sys.urls.submit          = 'https://leetcode-cn.com/problems/$slug/submit/';
  config.sys.urls.submissions     = 'https://leetcode-cn.com/api/submissions/$slug';
  config.sys.urls.submission      = 'https://leetcode-cn.com/submissions/detail/$id/';
  config.sys.urls.verify          = 'https://leetcode-cn.com/submissions/detail/$id/check/';
  config.sys.urls.favorites       = 'https://leetcode-cn.com/list/api/questions';
  config.sys.urls.favorite_delete = 'https://leetcode-cn.com/list/api/questions/$hash/$id';
};

// FIXME: refactor those
// update options with user credentials
function signOpts(opts, user) {
  opts.headers.Cookie = 'LEETCODE_SESSION=' + user.sessionId +
                        ';csrftoken=' + user.sessionCSRF + ';';
  opts.headers['X-CSRFToken'] = user.sessionCSRF;
  opts.headers['X-Requested-With'] = 'XMLHttpRequest';
}

function makeOpts(url) {
  const opts = {};
  opts.url = url;
  opts.headers = {};

  if (session.isLogin())
    signOpts(opts, session.getUser());
  return opts;
}

function checkError(e, resp, expectedStatus) {
  if (!e && resp && resp.statusCode !== expectedStatus) {
    const code = resp.statusCode;
    log.debug('http error: ' + code);

    if (code === 403 || code === 401) {
      e = session.errors.EXPIRED;
    } else {
      e = {msg: 'http error', statusCode: code};
    }
  }
  return e;
}

plugin.getProblems = function(cb) {
  plugin.next.getProblems(function(e, problems) {
    if (e) return cb(e);

    plugin.getProblemsTitle(function(e, titles) {
      if (e) return cb(e);

      problems.forEach(function(problem) {
        const title = titles[problem.id];
        if (title)
          problem.name = title;
      });

      return cb(null, problems);
    });
  });
};

plugin.getProblemsTitle = function(cb) {
  log.debug('running leetcode.cn.getProblemNames');

  const opts = makeOpts(config.sys.urls.graphql);
  opts.headers.Origin = config.sys.urls.base;
  opts.headers.Referer = 'https://leetcode-cn.com/api/problems/algorithms/';

  opts.json = true;
  opts.body = {
    query: [
      'query getQuestionTranslation($lang: String) {',
      '  translations: allAppliedQuestionTranslations(lang: $lang) {',
      '    title',
      '    questionId',
      '  }',
      '}',
      ''
    ].join('\n'),
    variables:     {},
    operationName: 'getQuestionTranslation'
  };

  const spin = h.spin('Downloading questions titles');
  request.post(opts, function(e, resp, body) {
    spin.stop();
    e = checkError(e, resp, 200);
    if (e) return cb(e);

    const titles = [];
    body.data.translations.forEach(function(x) {
      titles[x.questionId] = x.title;
    });

    return cb(null, titles);
  });
};

module.exports = plugin;
```

