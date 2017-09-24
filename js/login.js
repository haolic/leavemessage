// JavaScript Document
$(function(){
	$("#userName").focus(function(){
		$(".nametips").fadeOut(300);
		
	})
	$("#password").focus(function(){
		$(".pwdtips").fadeOut(300);
		
	})
	$(".loginbtn").click(function(){
		if(!$("#userName").val()){
			$(".nametips").fadeIn(300);
			return;
		}
		if (!$("#password").val()) {
			$(".pwdtips").fadeIn(300);
			return;
		}
		$.ajax({
			url:"php/login.php",
			data:{"name":$("#userName").val(),"pwd":$("#password").val()},
			type:"GET",
			dataType:"json",
			success:function(data) {

				if (data.status == 1) {

					//利用sessionStorage判断是否是管理员登陆.
					sessionStorage.setItem('isAdmin',$("#userName").val());
					location.href="index.html";
				} else {
					alert(data.message);
				}
			}
		})
	});
});