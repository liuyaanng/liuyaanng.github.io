$(document).ready(function(){
	auto = true;
	gi = 0;//初始化GET链接序号
	url_pre = 'https://cdn.jsdelivr.net/gh/GeekOcean/'
	url_pre_2 = '_resource@master/txt/'
	url_name = ['ks','tiktok']
	url_after = '.json'
	url = url_pre +url_name[gi] + url_pre_2 + url_after;

	player = document.getElementById("player");
	players();

	$("#bth").on("click", function(){
		auto = !auto;
		this.innerText = (auto ? 'Random' : 'Repeat');
		this.className = (auto ? 'zdlb' : 'xhms');
	});

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

	player.addEventListener('ended', function () {
		console.log("播放结束");
		if (auto == false) {
			player.play();
		} else {
			players();
		}
	}, false);

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
	$.get(url,function(data,status){
		if (status==status) {
			console.log("成功获取数据！");
			// console.log(typeof(data))
			data = JSON.parse(data)
			var i = getRandomInt(0,data.length);
			vdurl = data[i].url;
			player.src = vdurl;
			$.ajax({type: 'GET',url: vdurl,complete: function(response) {
				if(response.status != 200) {
					console.log(response.status);
					players();
				}
				else{
					player.src = vdurl;
					player.play();
				}
			}});
		} else {
			console.log("失败，重新发起请求！");
			players();
		}
	});
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

