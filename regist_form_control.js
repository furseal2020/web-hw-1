
function myCheck(){
var name = document.getElementById("name");
var email = document.getElementById("emailAddress");
var pw = document.getElementById("password");
var confirm_pw = document.getElementById("confirm_pw");
if(name.value=="")
{
	alert("Required fields cannot be blank.");
	return false;
}
if(email.value=="")
{
	alert("Required fields cannot be blank.");
	return false;
}
if(pw.value=="")
{
	alert("Required fields cannot be blank.");
	return false;
}
if(confirm_pw.value=="")
{
	alert("Required fields cannot be blank.");
	return false;
}

if(pw.value!=confirm_pw.value)
{
	alert("Please check your password.");
	return false;
}

var flag = 0;
for ( var counter = 0; counter < document.getElementsByName("sex").length; counter++ ) {
    if ( document.getElementsByName("sex")[counter].checked == true ) {
    flag = 1;
    }
}
if(flag==0)
{
	alert("Please select your sex.");
	return false;
}

return true;
};

function mySubmit(){

var lgbt = document.getElementById("LGBT").checked;
	
for ( var counter = 0; counter < document.getElementsByName("sex").length; counter++ )
{
    if ( document.getElementsByName("sex")[counter].checked == true ) {
    var index = counter;
    }
}
if(index==0)
{
	var data = { name: $("#name").val(), email: $("#emailAddress").val(), pw: $("#password").val(), confirm_pw: $("#confirm_pw").val(),color: $("#color").val(),sex:'male',LGBT: lgbt};
}
else
{
	var data = { name: $("#name").val(), email: $("#emailAddress").val(), pw: $("#password").val(), confirm_pw: $("#confirm_pw").val(),color: $("#color").val(),sex:'female',LGBT: lgbt};
}
	
	var flag=0;
	
	$.ajax({
		async : false, //設定成false之後alertbox才跳得出來
		url:"regist_form.php",
		type:"post",
		data : data,
		dataType : "json",
		cache:false, //筆者記得似乎當時在 IE8 上就碰到因為預設 cache 為 true ，導致每次抓回來的資料都一樣，所以如果要避免抓回來都是舊的資料還是把 cache 設為 false
		//dataType:"json", //dataType:要放的是 Server 傳回的資料類型，此處server沒有要回傳資料，所以你不應該有這行
		success:function(response){		
		if(response.server_response.flag==1)
		{
			alert('Registration Success. Please login again.');
			flag=1;  //不建議在success的回撥函式中直接return。Ref:https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/252897/
		}
		else if(response.server_response.flag==2)
		{
			alert("This account has already existed. Please try another user name.");
			flag=0;
		}
		else //flag==0
		{
			alert("Registration Failed : PHP failure.");
			flag=0;
		}
		
		},
		error:function(err){ //ajax請求失敗
		alert("Registration Failed : Ajax failure.");
		flag=0;
		
		}
	});
	if(flag==1)
	{
		return true;
	}
	else
	{
		return false;
	}
	
	
	
};

