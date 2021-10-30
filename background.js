chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		function: () => {
			// emulates clicking on the fullscreen button
			let className = `bilibili-player-iconfont 
			bilibili-player-iconfont-fullscreen-off 
			player-tooltips-trigger`;

			let fsButn = document.getElementsByClassName(className)[0];
			fsButn.click();
		}
	});
});