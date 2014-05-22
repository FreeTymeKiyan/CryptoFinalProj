$('#encipher').click(function(){
			var wep = new WEP($('#key').val(), $('#password').val());
			$('#binMsg').text(wep.encryption())
			$('#encipherMsg').val('');
			$('#encipherMsg').val(wep.encryption());
});

function binary2hex(str){
	var result = ""
	for (var i = 0; i < str.length/8; i++) {
		var singleHex= parseInt(str.substring(i*8, i*8+8),2).toString(16);
		if(singleHex.length != 2){
			singleHex = 0+singleHex;
		}
		result += (singleHex + " ");
	};
	return result;
}

$('#submit').click(function(){
	console.log($('#encipherMsg').val());
	$.ajax({
		type:'post',
		url:'/auth',
		data:{'cipher':$('#encipherMsg').val()},
		dataType:'JSON'
	}).done(function(res){
		if(res.err){
			return alert("Error: " + res.err)
		}
		return alert("Success: " + res.succ);
	});
});
