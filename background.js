chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "danmaku",
		title: "弹幕开关",
		type: "normal",
		contexts: ["page"],
	});

	chrome.contextMenus.create({
		id: "fullscreen",
		title: "全屏",
		type: "normal",
		contexts: ["page"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId == "danmaku") {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: toggleDanmaku
		});
	} else if (info.menuItemId == "fullscreen") {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: fullscreen
		});
	}
});

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		function: fullscreen
	});
});

function fullscreen() {
	// emulates clicking on the fullscreen button
	let className = `bilibili-player-iconfont 
	bilibili-player-iconfont-fullscreen-off 
	player-tooltips-trigger`;

	try {
		let fsButn = document.getElementsByClassName(className)[0];
		fsButn.click();
	} catch (e) {
		alert("网站非 Bilibili 网站，全屏失败！");
	}
}

function toggleDanmaku() {
	// emulates clicking on the danmaku button
	try {
		let elements = document.getElementsByClassName("bui-switch-input");
		
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].ariaLabel == "弹幕") {
				let danmakuCheckbox = elements[i];
				danmakuCheckbox.click();
			}
		}
	} catch (e) {
		alert("网站非 Bilibili 网站，打开弹幕失败！");
	}
}