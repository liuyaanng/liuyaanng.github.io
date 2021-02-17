$(document).ready(function(){
	setInterval('var hour = new Date().getHours();var minutes = new Date().getMinutes();var seconds = new Date().getSeconds();if( hour < 10 ){ hour = "0"+hour; }if( minutes < 10 ){ minutes = "0"+minutes; }if( seconds < 10 ){ seconds = "0"+seconds; }$("#time").html(hour+":"+minutes+":"+seconds);', 1000);
	setTimeout(function(){$("#msgs").hide();},10000);
	layer.msg('Loading Environment, please wait a second...');
	auto = true;//循环播放模式
	gi = 0;//初始化GET链接序号
	url_pre = 'https://cdn.jsdelivr.net/gh/liuyaanng/douyin_resource@master/txt/'
	url_name = ['ks','toktik']
	url_after = '.json'
	url = url_pre +url_name[gi] + url_after;
	player = document.getElementById("player");
	players();
	layer.msg('Loaded successfully!', {time: 10000,
		btn: ['Full Screen', 'Keep it'],yes:function(){
			toggleFullScreen();layer.closeAll();player.play();
		}	});
	//播放结束事件
	player.onended = function() {
		if (auto == true) {//播放结束，执行重播！
			player.play();
		} else {//播放结束，重新获取数据！
			pass();
		}
	}
});
//播放模式选择
$("#auto_btn").on("click", function(){
	auto = !auto;console.log(auto);
	this.innerText = (auto ? 'Repeat' : 'Loop');
});
//播放源按钮事件
$("#yuan").on("click", function(){
	if (gi < url_name.length - 1) {
		gi = gi + 1;
		this.innerText =  url_name[gi];
	} else {
		gi = 0;
		this.innerText =  url_name[gi];
	}
	url = url_pre + url_name[gi] + url_after;
	console.log(url);
});

//PASS切换事件
function pass(){
	setTimeout(function () {
		players();
	}, 257);
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

//GET播放链接
function players() {
	layer.msg('Loading...', {icon: 16,time: 400,shadeClose: true,});
	$.get(url,function(vdurl_data,status){
		if (status==status) {
			// console.log(status)
			vdurl_data = JSON.parse(vdurl_data)
			var i = getRandomInt(0, vdurl_data.length)
			vdurl = vdurl_data[i].url;

			player.src = vdurl;
			var video = document.createElement('video');

			video.onload = function() {
			}

			video.onerror = function() {
			}

			video.src = vdurl;
			//不同浏览器情况不同，这里判断在该浏览器是否可以播放
			if(video.loadstart = function() {
				console.log(video.status)
			}){
				console.log("if ")
			}
			else{console.log("elelslelsl")}
			// console.log(vdurl);
			// let xhr = new window.XMLHttpRequest();
			// xhr.open('get', vdurl)
			// // xhr.open('get', 'http://tx.cdn.kwai.net/upic/2018/05/13/22/BMjAxODA1MTMyMjM2MDVfMzIxMzgyMjQ0XzYyNzg2MjQ5NjJfMV8z_hd3_Bde1a5b86b6cb178de96e7c35d3e9e29e.mp4')
			// xhr.responseType = 'arraybuffer';
			// // xhr.setRequestHeader('Range', `bytes=0-390625`)
			// xhr.onload = function () {
			//	console.log(xhr.status)
			//	if (xhr.status === 200 || xhr.status === 206 || xhr.status === 304) {
			//		console.log(xhr.response)
			//		player.play()
			//	}
			//	else{
			//		pass()
			//	}
			// }
			// //	$.ajax({url: vdurl,type: 'GET',complete: function(response) {
			//		if(response.status != 200) {//测试链接通信状态
			//			console.log('加载失败!')
			//			pass();
			//		}else{
			//			player.play();
			//		}
			//	}});
		} else {
			$("#msg").html("Load failed, Reloading....");
			pass();
		}
	});
}
//点击屏幕事件
$("#player").click(function(){
	if (player.paused) {
		// $("#logo_img").hide();
		player.play();
		// $("#msgs").hide();
	} else {
		// $("#logo_img").show();
		player.pause();
		// $("#texts").show();
		// $("#msgs").show();
	}
});
// $("#logo_img").click(function(){
//	if (player.paused) {
//		$("#logo_img").hide();
//		player.play();
//	} else {
//		$("#logo_img").show();
//		player.pause();
//	}
// });
$("#logo_img").dblclick(function(){
	toggleFullScreen();
});
$("#player").dblclick(function(){
	toggleFullScreen();
});
//进入全屏，建议使用EDGE浏览器
function toggleFullScreen() {
	if (!document.fullscreenElement &&
		!document.mozFullScreenElement && !document.webkitFullscreenElement) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}
//触摸屏幕手势
var startx, starty; //获得角度
function getAngle(angx, angy) {
	return Math.atan2(angy, angx) * 180 / Math.PI;
};
function getDirection(startx, starty, endx, endy) { //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
	var angx = endx - startx;
	var angy = endy - starty;
	var result = 0;
	if (Math.abs(angx) < 2 && Math.abs(angy) < 2) { //如果滑动距离太短
		return result;
	}
	var angle = getAngle(angx, angy);
	if (angle >= -135 && angle <= -45) {
		result = 1;
	} else if (angle > 45 && angle < 135) {
		result = 2;
	} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		result = 3;
	} else if (angle >= -45 && angle <= 45) {
		result = 4;
	}
	return result;
}
document.addEventListener("touchstart",function(e) { //手指接触屏幕
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
},false);
document.addEventListener("touchend",function(e) { //手指离开屏幕
	var endx, endy;
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;
	var direction = getDirection(startx, starty, endx, endy);
	switch (direction) {//1向上 2向下 3向左 4向右 0未滑动
		case 1:
			players();
			break;
		case 2:
			playold();
			break;
		case 3:
			$('#texts').hide();
			textstf = !textstf;
			break;
		case 4:
			$('#texts').show();
			textstf = !textstf;
			break;
	}
},false);

