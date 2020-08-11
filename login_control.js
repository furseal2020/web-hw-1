function myCheck(){
var name = document.getElementById("name");
var pw = document.getElementById("password");
if(name.value=="")
{
	alert("Please enter your Username.");
	return false;
}
if(pw.value=="")
{
	alert("Please enter your password.");
	return false;
}


return true;
};

function mySubmit(){
	
	var flag = 0;
	var id= -1;
	var obj = new Object();
	var data = { 'name': $("#name").val(), 'pw': $("#password").val() }; //取得 id 為 name 的元素 $('#name')

	$.ajax({
		async: false, //其實是因為 $.ajax 方法預設的 async:true 啟動非同步方法，也就是說並不會等 $.ajax 執行完成才 return ，而是一開始就直接 return 了。Ref:https://www.dotblogs.com.tw/jasonyah/2013/06/02/use-ajax-you-need-to-be-care
		url:"login.php",
		type:"post",
		data : data,
		dataType:"json", //dataType:要放的是 Server 傳回的資料類型
		cache:false, //筆者記得似乎當時在 IE8 上就碰到因為預設 cache 為 true ，導致每次抓回來的資料都一樣，所以如果要避免抓回來都是舊的資料還是把 cache 設為 false
		complete:function(response){
		console.log(response); //<-這個技巧非常重要!!!
	    
		if(response.responseJSON.server_response.flag==1)
		{
			alert("Login Success.");
			flag = 1;
			id=response.responseJSON.server_response.id;
		}
		else
		{
			alert("Please check your Username and Password.");
			flag = 0;
		}
		},
		error:function(err){
		alert("Login Failed : Ajax failure.");
		}
	});
	
	
	if(flag==1)
	{
		document.cookie = "id=" + id;
		return true; 
	}
	else
	{
		return false;
	}
	
};