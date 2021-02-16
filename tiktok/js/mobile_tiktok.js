$(document).ready(function () {
	let ourRequest = new XMLHttpRequest();
	url_pre = 'https://cdn.jsdelivr.net/gh/liuyaanng/douyin_resource@master/txt/'
	url_after = 'toktik.json'
	url = url_pre + url_after;

	let ourData;
	ourRequest.onreadystatechange = function () {
		if (ourRequest.readyState == 4 && ourRequest.status == 200) {
			ourData = JSON.parse(ourRequest.responseText);
			console.log(ourData);
			console.log(ourData.results[0]);
		}
	};

	ourRequest.open("GET", URL);
	ourRequest.send();
	player = document.getElementById("player");
	players();

	touchtime = new Date().getTime();
	$("#player").on("click", function () {
		if (new Date().getTime() - touchtime < 500) {
			console.log("dblclick");
			FullScreen();
		} else {
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
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			obj = JSON.parse(data);
		})
		.catch(function (err) {
			console.error(err);
		});
	console.log(i);
	var i = getRandomInt(0, obj.length);
	player.src = obj[i].url;
	player.play();
}

//进入全屏
function FullScreen() {
	if (player.requestFullscreen) {
		player.requestFullscreen();
		player.play();
	} else if (player.mozRequestFullScreen) {
		player.mozRequestFullScreen();
		player.play();
	} else if (player.webkitRequestFullScreen) {
		player.webkitRequestFullScreen();
		player.play();
	}
}
	</script>
	<script>
	var startx, starty;
//获得角度
function getAngle(angx, angy) {
return (Math.atan2(angy, angx) * 180) / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
	var angx = endx - startx;
	var angy = endy - starty;
	var result = 0;

	//如果滑动距离太短
	if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
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
//手指接触屏幕
document.addEventListener(
	"touchstart",
	function (e) {
		startx = e.touches[0].pageX;
		starty = e.touches[0].pageY;
	},
	false,
);
//手指离开屏幕
document.addEventListener(
	"touchend",
	function (e) {
		var endx, endy;
		endx = e.changedTouches[0].pageX;
		endy = e.changedTouches[0].pageY;
		var direction = getDirection(startx, starty, endx, endy);
		switch (direction) {
			case 1:
				console.log("向上！");
				players();
				break;
			case 3:
				console.log("向左！");
				players();
				break;
		}
	},
	false,
);

