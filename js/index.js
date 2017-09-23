function deleteClick(){		
	var index = $(this).parent().parent().data('id');
	$.ajax({
		url: 'php/delete.php',
		type: 'GET',
		data: {"userId":$(this).parent().parent().data('id')},
		dataType: 'json',
		success: function(data){
			if (data.status == 1) {
				$(".part[data-id=" + index + "]").slideUp(300);
			}
		}
	})
}
function render(data) {
	var str = '';
	$.each(data.data, function(index, value){
		str += '<div class="part" data-id='+ value.userId +'>' + 
			'<p>'+
			'<span class="time">'+value.porTime+'</span><br/>' + '<img valign="middle" width="40" src="images/' + value.face + '" />　' + '<span class="name">'+value.name+':</span>'
			+'</p>'+
			'<p class="innertext">'+
				value.detail
			+'</p><p class="editbutton"><button class="edit delete">删除</button><button class="edit reply">回复</button></p>'
		 + '</div>';
		$("#talk").html(str);
	})
}

$(function(){
	$.ajax({
		url:'php/index.php',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			render(data);
		},
		complete: function(){
			if(sessionStorage.getItem('isAdmin')){
				$('.editbutton').css({"display":"block"});
			}
			$("#_name").focus(function(){
				$('#nametips').fadeOut(200);
			});
			$("#_detail").focus(function(){
				$('#detailtips').fadeOut(200);
			})

			//点击发布按钮
			var sendFlag = false;
			$("#send").click(function(){
				if (sendFlag) {
					return;
				}
				sendFlag = true;
				if(!$('#_name').val()){
					$('#nametips').fadeIn(200);
					return;
				}
				if(!$('#_detail').val()){
					$('#detailtips').fadeIn(200);
					return;
				}

				//发布留言ajax
				$.ajax({
					url: 'php/add.php',
					type: 'POST',
					data: {"name": $('#_name').val(),"detail": $('#_detail').val(),"face": $('#face').val()},
					dataType: 'json',
					success: function(data) {
						$('#_name').val('');
						$('#_detail').val('');
						sendFlag = false;
						if(data.status == 1) {
							$(".littletips").html("发布成功").fadeIn(500).fadeOut(500);
							setTimeout(function () {
								$.ajax({
									url:'php/index.php',
									type: 'GET',
									dataType: 'json',
									success: function(data) {
										render(data);
									}
								})
							},1000);
						} else {
							$(".littletips").html("失败").fadeIn(500).fadeOut(500);
						}
					}
					
				})
			})
			//选择头像
			$("#face").change(function(){
				$("#pics").attr('src', "images/"+ $("#face").val());
			})
			//点击删除按钮删除留言.
			$(".delete").click(deleteClick);
		}
	})
})