$(function(){
	$.ajax({
		url:'index.php',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var str = '';
			$.each(data.data, function(index, value){
				str += '<div class="part">' + 
					'<p>'+
					'<span class="time">'+value.porTime+'</span><br/>'+'<span class="name">'+value.name+':</span>'
					+'</p>'+
					'<p class="innertext">'+
						value.detail
					+'</p>'
				 + '</div>'
				$("#talk").html(str);
			})
		}
	})
})