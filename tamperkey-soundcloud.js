// ==UserScript==
// @name         soundcloud 0.1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @downloadURL  https://raw.githubusercontent.com/yeucodonvn/codejs/master/tamperkey-soundcloud.js
// @downloadURL  https://raw.githubusercontent.com/yeucodonvn/codejs/master/tamperkey-soundcloud.js
// @match        https://soundcloud.com/*
// @require 	 https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function () {
	'use strict';
	var URLsc;
	var temp_number = 200;

	$.ajax ( {
		type:       'GET',
		url:        'https://raw.githubusercontent.com/yeucodonvn/codejs/master/URL.json',
		dataType:   'JSON',
		success:    function (apiJSON) {
			let PARAMS = apiJSON;
			URLsc=PARAMS.soundcloud;
		},
		error:      function(err){
			alert("Cannot load JSON file");
			alert(err);
		}
	});


	// var obseles  =document.querySelector("#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)")
	
	
	// obseles.addEventListener('onStateChange',(state)=>{
	// console.log('state');
	// }
	// );





	function play_btn() {
		var loopClickRepeat = setInterval(function () {
			let element = document.querySelector(".sc-button-play.playButton.sc-button.m-stretch");
			if (element !== null) {
					clearInterval(loopClickRepeat);
					let rem = element.getAttribute("title")
					if (rem=="Play") {
						console.log("play btn");
						element.click();
					}
					setTimeout(shuffle, 10000);
					setTimeout(repeatpp,1000)
				} else {
					console.log("search play btn");
				}
		}, 5000);
	};
	
	function repeatpp() {
		let intload = 0;
		let loop = setInterval(function() {
			let element = document.querySelector(".repeatControl.sc-ir");
			let repeatLabel = element.getAttribute("class");
			if (repeatLabel !== "repeatControl sc-ir m-all") {
			console.log("click shuffle");
			element.click();
			}else{clearInterval(loop);}
			if(intload>7){clearInterval(loop)}
		},1000)

	};
	function shuffle() {
		var element = document.querySelector('[title="Shuffle"]');
		var repeatLabel = element.getAttribute("class");
		if (repeatLabel !== "shuffleControl sc-ir m-shuffling") {
			console.log("click shuffle");
			element.click();
			clickLike();
			clickFollow();
		}
		//setInterval(next, 80*1000);
	};

	function clickLike(){
        let loopClickLikeRepeat = setInterval(function(){
            let btnRender = document.querySelector('[aria-label="Like"]');
            if(btnRender != null){
                if(Math.floor(Math.random() * 125) > 100){
                    console.log("Like Click");
					btnRender.click();
                }
                clearInterval(loopClickLikeRepeat);
            }
        },100 * 1000);
	}

	function clickFollow(){
        let loopClickLikeRepeat = setInterval(function(){
            let btnRender = document.querySelector('[aria-label="Follow"]');
            if(btnRender != null){
                if(Math.floor(Math.random() * 105) > 100){
                    console.log("Like Click");
					btnRender.click();
                }
                clearInterval(loopClickLikeRepeat);
            }
        },100 * 1000);
	}

	function next() {
		console.log("click next");
		let loop = setInterval(function(){
			if(Math.floor(Math.random() * 15) > 10){
				console.log("Like Click");
				document.querySelector('.sc-button-like.playbackSoundBadge__like.sc-button.sc-button-small.sc-button-icon.sc-button-responsive').click();
			}
			document.querySelector(".skipControl.sc-ir.playControls__control.playControls__next.skipControl__next").click();
		},70*1000)
	}

	/*
	nghien cuu check onchange cua thang totaltime de check next bai


	function hmsToSecondsOnly(str) {
		var p = str.split(':'),
			s = 0, m = 1;

		while (p.length > 0) {
			s += m * parseInt(p.pop(), 10);
			m *= 60;
		}

		return s;
	};

		function f() {//dem lui reload
				if(temp_number>0){
					console.log(temp_number);
					var loopGetDuration = setInterval(
					function(){
							var Duration = document.querySelector('[data-test="seekbar-duration"]');
							if(Duration!==null){
								clearInterval(loopGetDuration);
								var totalDuration=hmsToSecondsOnly(Duration.textContent.trim());
								var current_time = hmsToSecondsOnly(document.querySelector('[data-test="seekbar-position"]').textContent.trim());
								if(totalDuration>0){
									var endtime=totalDuration-current_time;
									console.log("Get duration Total "+endtime);
									temp_number--;
									setTimeout(get_time,(endtime+5)*1000);
								}else{
									document.querySelector('[data-test="next-button"]').click();
								}
							}
						},5000);
				} else {location.reload(true);}
		};
		function get_loading(){
			var chkcircle = document.querySelector('[aria-label="Play Button"]').getElementsByTagName("circle").length;
			var current_time = hmsToSecondsOnly(document.querySelector('[data-test="seekbar-position"]').textContent.trim());
			if(chkcircle ==1 && current_time!=0){
				console.log("loading error, click next ");
				document.querySelector('[data-test="next-button"]').click();
				get_time();
			}
		};
		*/

	function run() {
		console.log("SOUNDCLOUD AutoPlay - MANAGER - Repeat Number " + temp_number);
		//URLsc.forEach(element => console.log(element));
				setTimeout(play_btn, 20000);
	};

	setTimeout(run, 5000);
})();
