$(document).ready(function(){
	auto = true;
	url_pre = 'https://cdn.jsdelivr.net/gh/liuyaanng/douyin_resource@master/txt/'
	url_after = 'tiktok.json'
	url = url_pre + url_after;
	player = document.getElementById("player");
	players();

	touchtime = new Date().getTime();
	$("#player").on("click", function(){
		if( new Date().getTime() - touchtime < 500 ){
			console.log("dblclick");
			FullScreen();
		}else{
			touchtime = new Date().getTime();
			console.log("click");
			if (player.paused) {
				player.play();
			} else {
				player.pause();
			}
		}
	});
});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function players() {
	console.log("成功获取数据！");
	// console.log(url)
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			obj = JSON.parse(data)
		})
		.catch(function (err) {
			console.error(err);
		});
	console.log(obj.length);
	var i = getRandomInt(0,obj.length);
	// console.log(i)
	player.src =	obj[i].url;
	// console.log(player.src)
	player.play();
}

//进入全屏
function FullScreen() {
	if (player .requestFullscreen) {
		player .requestFullscreen();
		player.play();
	} else if (player .mozRequestFullScreen) {
		player .mozRequestFullScreen();
		player.play();
	} else if (player .webkitRequestFullScreen) {
		player .webkitRequestFullScreen();
		player.play();
	}
}

