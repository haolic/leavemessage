// JavaScript Document
$(function(){
	$(".loginbtn").click(function(){
		$.ajax({
			url:"login.php",
			data:{"name":$("#userName").val(),"pwd":$("#password").val()},
			type:"GET",
			dataType:"json",
			success:function(data) {
				if (data.status == 1) {
					location.href="index.html";
				} else {
					alert(data.message);
				}
			}
		})
	});
});