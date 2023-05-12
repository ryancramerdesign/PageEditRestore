function PageEditRestore($) {

	let settings = {
		pingTime: 300, 
		logoutMsg: 'You are logged out.', 
		saveMsg1: 'Click “Save” and login again.', 
		saveMsg2: 'Click “Save”, login again, and restore your changes.',
		changes: []	
	};
	
	if(typeof ProcessWire.config['PageEditRestore'] !== 'undefined') {
		settings = ProcessWire.config['PageEditRestore'];
	}
	
	let id = $('#Inputfield_id').val();
	let pingTime = parseInt(settings.pingTime) * 1000;
	let pingUrl = ProcessWire.config.urls.admin + 'page/edit/ping/?id=' + id;
	let pingInterval;
	
	if(pingTime > 0) {
		let pingFunction = function() {
			$.get(pingUrl, function(data) {
				if(data.indexOf('ProcessLoginPass') < 0) return; // password input id attribute
				clearInterval(pingInterval);
				let changed = $('.InputfieldStateChanged');
				let msg = settings.logoutMsg + ' ' + (changed.length ? settings.saveMsg2 : settings.saveMsg1);
				ProcessWire.alert(msg);
			});
		}
		pingInterval = setInterval(pingFunction, pingTime);
	}
	
	if(typeof settings.changes !== 'undefined' && settings.changes.length) {
		for(let n = 0; n < settings.changes.length; n++) {
			let $input = $(':input[name=' + settings.changes[n] + ']'); 
			if(!$input.length) continue;
			let $inputfield = $input.closest('.Inputfield');
			if(!$inputfield.length) continue;
			$inputfield.addClass('InputfieldIsHighlight');
		}
	}
}

jQuery(document).ready(function($) {
	PageEditRestore($);
});