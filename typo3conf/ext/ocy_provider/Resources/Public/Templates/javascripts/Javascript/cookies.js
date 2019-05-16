$(document).ready(function(){
	var cookiName = "cookieHint";
	var cookieValue = true;
	
	cookieSet = readCookie(cookiName);
	if(cookieSet == null) {
		showCookieHint();
		date = new Date();
		date.setTime(date.getTime()+(24*60*60*1000));
		//var day = date.getDate();
		//var month = date.getMonth() + 1;
		//var year = date.getFullYear();
		//var cookieDent = year+'-'+month+'-'+day+'T22:00:00.000Z';
		writeCookie(cookiName, cookieValue, date.toGMTString());
	}
	
	$('#acceptCookies').click(function(ev) {
		$('#cookiehint').slideUp('fast');
		//$('#cookiehint').removeClass('showHint');
	});
});

function writeCookie(name, value, duration) {
	document.cookie =  name + "=" + value + "; expires="+ duration +"; path=/";
}

function readCookie(name) {
	var cookies = document.cookie.split(';');
	var result = null;
	for(var i = 0; i < cookies.length; i++) {
		perValue = cookies[i].split('=');
		if(perValue[0].trim() == name) result = perValue[1];
	}
	return result;
}

function showCookieHint() {
	$('#cookiehint').slideDown('fast');
}