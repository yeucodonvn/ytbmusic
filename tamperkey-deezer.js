// ==UserScript==
// @name         deezer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @require  	 https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/yeucodonvn/codejs/master/tamperkey-deezer.js
// @downloadURL  https://raw.githubusercontent.com/yeucodonvn/codejs/master/tamperkey-deezer.js
// @description  try to take over the world!
// @author       You
// @match        https://www.deezer.com/*
// @grant        none
// ==/UserScript==

(function() {
function play(){
	 console.log("play");
	var play = document.querySelector("[aria-label='Next']").click();
	setTimeout(pause,180*60*1000);
}

function Shuffle(){
	 console.log("Shuffle");
	var Shuffle= document.querySelector("[aria-label='Turn on Shuffle']")!==null;
	if(Shuffle)	{
		document.querySelector("[aria-label='Turn on Shuffle']").click();
	}
}
function pause(){
	 console.log("pause");
	var repeatElm = document.querySelector("[class='svg-icon-group-btn is-highlight']");
	var repeatLabel = repeatElm.getAttribute("aria-label");
	if(repeatLabel == "Pause"){
	repeatElm.click();
		setTimeout(reload,10*1000);
	}
}

function reload(){
	 console.log("reload");
	var repeatElm = document.querySelector("[class='svg-icon-group-btn is-highlight']");
	var repeatLabel = repeatElm.getAttribute("aria-label");
	if(repeatLabel == "Play"){
		window.location.reload();
	}
}

function run() {
        console.log("Deezer");

        $(window).off('beforeunload.windowReload');
		Shuffle();
       	setTimeout(play,10*1000);
    };

    setTimeout(run, 5000);

})();
