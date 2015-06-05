window.onload=function(){
	var path = encodeURIComponent(window.location.pathname);
	var website = encodeURIComponent(window.location.hostname);
	var referer = encodeURIComponent(document.referer);
	var cookie = encodeURIComponent(document.cookie);
	var pn = encodeURIComponent(document.title);
	var vp = encodeURIComponent(screen.availWidth+'x'+screen.availHeight);
	var sr = encodeURIComponent(screen.width+'x'+screen.height);
	var ul = encodeURIComponent(window.navigator.userLanguage || window.navigator.language);
	var loadTime = performance.timing.responseEnd - performance.timing.responseStart;
	var DOMTime = performance.timing.domComplete - performance.timing.domLoading;

	var pixel = document.createElement('img');
	pixel.style.height='1px';
	pixel.style.width='1px';
	pixel.src="http://"+ma_url+"/pixel.png?p="+path+
											   "&website="+website+
											   "&referer="+referer+
											   '&cookie='+cookie+
											   "&pn="+pn+
											   "&vp="+vp+
											   "&sr="+sr+
											   "&ul="+ul+
											   "&lt="+loadTime+
											   "&lt="+DOMTime+
											   "&ts="+Date.now();
	document.body.appendChild(pixel);
	console.log('MonitorJS Analytics system loaded');
}