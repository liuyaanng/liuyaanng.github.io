// const attributes = [
//	// 用于panel外层div的属性
//	'autocomplete="off"',
//	'autocorrect="off"',
//	'autocapitalize="off"',
//	'spellcheck="false"',
//	'contenteditable="true"'
// ];
// const attributesStr = attributes.join(" ");
// // 此方法可以获取所有文章的全部内容，具体可以打印 data
// hexo.extend.filter.register("after_post_render", data => {
//	// 这里是使用while持续获取匹配到的代码区域的dom标签
//	// 这里可能就有人问'为什么别人的文章都是/<pre ***>/你的是/<pre>***/'
//	// 你说为啥不一样，我们用的不是一个主题呗，这里的正则是根据你当前主题内文章渲染后代码区域的dom标签来定
//	// 查看dom都会吧
//	while (/<pre class="(([\s\S])*?)"><\/pre>/.test(data.content)) {
//		// 之后的操作就是将匹配到的标签，在其外层拼接一个div，然后返回所有文章
//		console.log(data.content)
//		data.content = data.content.replace(/<pre>(([\s\S])*?)<\/pre>/, () => {
//			let lastMatch = RegExp.lastMatch;
//			let language =
//				RegExp.$1.match(/(?<= )class=".*?"/)[0].split("=")[1] || "plain";
//			lastMatch = lastMatch.replace(/<pre>/, '<pre class="iseeu">');
//			console.log(lastMat)
//			return `<div class="highlight-wrap"${attributesStr} data-rel=${language.toUpperCase()}>${lastMatch}</div>`;
//		});
//	}
//	return data;
// });
//
// // //
// var attributes = [
//	'autocomplete="off"',
//	'autocorrect="off"',
//	'autocapitalize="off"',
//	'spellcheck="false"',
//	'contenteditable="true"'
// ]
// var attributesStr = attributes.join(' ')
//
// hexo.extend.filter.register('after_post_render', function (data) {
//	while (/<pre class="language-([a-zA-Z]+)">.*?<\/pre>/.test(data.content)) {
//		data.content = data.content.replace(/<pre class="language-([a-zA-Z]+)">.*?<\/pre>/, function () {
//			var language = RegExp.$1 || 'plain'
//			var lastMatch = RegExp.lastMatch
//			console.log(lastMat)
//			lastMatch = lastMatch.replace(/<pre class="language-/, '<pre class="iseeu language /')
//			return '<div class="highlight-wrap"' + attributesStr + 'data-rel="' + language.toUpperCase() + '">' + lastMatch + '</div>'
//		})
//	}
//	return data
// })
