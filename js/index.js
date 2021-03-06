//删除留言
var index;
var pageindex = 1;
var pagenum;
var replyindex;
function deleteClick(){		
	index = $(this).parent().parent().data('id');
	$(this).parent().parent().siblings(".replyarea").animate({"height": "0"});
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
//分页
function pagebreak(count) {
	$.ajax({
		url: 'php/index.php',
		type: 'GET',
		dataType: 'json',
		data: {"pagenum": count},
		success: function(data) {
			render(data);
		}
	})
}
//主留言区显示函数:
function render(data) {
	var str = '';
	pagenum = data.data[0].pagenum;
	$.each(data.data, function(index, value){
		str += '<div class="part" data-id='+ value.userId +'>' + 
			'<p>'+
			'<span class="time">'+value.porTime+'</span><br/>' + '<img valign="middle" width="40" src="images/' + value.face + '" />　' + '<span class="name">'+value.name+':</span>'
			+'</p>'+
			'<p class="innertext">'+
				value.detail
			+'</p>'+
				'<p class="adminreply">'+ (value.reply ? value.adminName+'回复: ' : '') + 
				'<br/><span class="adminreplytext">'+ value.reply+'</span>'
			+ '</p>'
			+'<p class="editbutton"><button class="edit delete">删除</button><button class="edit reply">回复</button></p>'
		 + '</div>';
		$("#talk").html(str);
	});
	if(sessionStorage.getItem('isAdmin')){
		$(".gobottom").hide();
		$('.editbutton').css({"display":"block"});
		$('.input_area').css({"display":"none"});
		$("header h1").html("留　言　管　理");
		$("#weladmin").html("欢迎你: " + sessionStorage.getItem('isAdmin'));
	};
	//点击删除按钮删除留言.
	$(".delete").click(deleteClick);
	//管理员回复部分特效:
	$("button.reply").click(function () {
		index = $(this).parent().parent().data('id');
		if($(this).attr('flag')) {
			return
		};
		$(this).attr('flag',true);
		$(this).parent().parent().after('<div class="replyarea"><section class="input_area"><form><div class="group_detail">回复:　<span class="replytips">请输入回复内容~~</span><br><textarea placeholder="请输入回复内容" class="replaytext"></textarea></div><div class="group_button"><input type="button" value="发布" class="success"><input type="button" value="取消" class="cancel"><input type="reset" value="重新输入" class="reset"></div></form></section></div>');
		$(this).parent().parent().next().siblings(".replyarea").animate({"height": "0"}, function(){
			$(this).prev().find("button.reply").removeAttr("flag");
		}).end().animate({"height": "380px"});
		$("input.cancel").click(function(){
			$(this).parent().parent().parent().parent().animate({"height": "0"},function(){
				$("button.reply").removeAttr("flag");
			});
		});
		//管理员回复部分数据交互:
		$(".success").click(function() {
			
			var _adminreply = $(this).parent().parent().parent().parent().prev().find("p.adminreply")
			$("textarea").focus(function () {
				$(".replytips").fadeOut(300);
			})
			if(!$(this).parent().prev().find("textarea").val()){
				$(".replytips").fadeIn(300);
				return;
			}
			var _this = $(this).parent().parent().parent().parent();
			var _replyText = $(this).parent().prev().find("textarea").val().replace(/(\r\n)|(\n)/g,'<br>');
			$.ajax({
				url: "php/reply.php",
				type: "POST",
				data: {"adminName": sessionStorage.getItem('isAdmin'), "replyText": _replyText, "userId": index},
				dataType: "json",
				success: function (data) {
					if(data.status == 1) {
						_this.slideUp(200);
						$("button.reply").removeAttr("flag");
						_adminreply.html(sessionStorage.getItem("isAdmin") + "回复: <br />" + "<span class='adminreplytext'>" + _replyText + "</span>");
					}
					$(".delete").click(deleteClick);
				}
			})
		});
	});
}
//页面渲染开始.
$(function(){
	$.ajax({
		url:'php/index.php',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			pagenum = data.data[0].pagenum;//页数.
			var _str = "";
			for(var i = 1; i <= pagenum; i ++) {
				_str += "<a href='#top' class='pagenum' data-id=" + i + ">" + i + "</a>"
			}
			$("#_pagenum").html(_str);
			render(data);
			$("a.pagenum").eq(0).css({"background":"#d9edf7"});
			$("a.pagenum").click(function(){
				$(this).css({"background":"#d9edf7"}).siblings().css({"background": "#fcf8e3"})
				pageindex = $(this).data("id");
				pagebreak(pageindex);
			})
		},
		complete: function(){
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
					sendFlag = false;
					return;
				}
				if(!$('#_detail').val()){
					$('#detailtips').fadeIn(200);
					sendFlag = false;
					return;
				}
				var _detail = $("#_detail").val().replace(/(\r\n)|(\n)/g,'<br>');
				//发布留言ajax
				$.ajax({
					url: 'php/add.php',
					type: 'POST',
					data: {"name": $('#_name').val(),"detail": _detail,"face": $('#face').val()},
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
			//分页器点击上/下一页.
			$("#prevpage").click(function() {
				pageindex --;
				if (pageindex < 1) {
					pageindex = 1;
				}
				$("a.pagenum").css({"background": "#fcf8e3"}).eq(pageindex-1).css({"background":"#d9edf7"});
				pagebreak(pageindex);
			})
			$("#nextpage").click(function () {
				pageindex ++;
				if(pageindex > pagenum) {
					pageindex = pagenum;
				}
				$("a.pagenum").css({"background": "#fcf8e3"}).eq(pageindex-1).css({"background":"#d9edf7"});
				pagebreak(pageindex);
			})
			//跳转到 
			$("#jumpbutton").click(function(){
				var inputpagenum=$("#inputpagenum").val();
					if(parseInt(inputpagenum)>pagenum){
						inputpagenum=pagenum;
					};
					if(parseInt(inputpagenum)<1){
						inputpagenum=1;
					};
					pageindex=inputpagenum;
					$("a").eq(parseInt(inputpagenum)+1).css({"background":"#d9edf7"}).siblings().css({"background": "#fcf8e3"});
					pagebreak(pageindex);
			});
			$(".inputpagenum").keyup(function(){
				if(!/\d/.test($("#inputpagenum").val())){
					$("#inputpagenum").val("");
				};
			});
		}
	})
})