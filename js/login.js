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
					sessionStorage.setItem('isAdmin','admin');
					location.href="index.html";
				} else {
					alert(data.message);
				}
			}
		})
	});
});