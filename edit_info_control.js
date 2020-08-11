var id = "";
window.onload = getData;

function myClick()
{
	var email = document.getElementById("emailAddress1").value; 
	var pw = document.getElementById("password1").value;
	var color = document.getElementById("color1").value;
	if(document.getElementById("sex_male").checked == true)
	{
		var sex = "male";
	}
	else
	{
		var sex = "female";
	}
	if(document.getElementById("LGBT").checked == true)
	{
		var lgbt = 1;
	}
	else
	{
		var lgbt = 0;
	}
	
	var data = {"id":id, "email":email, "pw":pw, "color":color, "sex":sex, "lgbt":lgbt};
	var flag = 0;
	console.log(data);
	
	$.ajax({
		async: false, 
		url:"edit_info.php", 
		type:"post",
		data : data,
		dataType:"json",
		cache:false, 
		success:function(response){
		console.log(response); 
		
	    if(response.server_response.flag==1)
		{
			alert("Modify Success.");
			flag = 1;
			return false;
			
		}
		else
		{
			alert("Modify Failed.");
			return false;
		}
		
		},
		error:function(err){
		alert("Ajax failure.");
		return false;
		}
	});	 
    
	
};


function getData()
{
	id=getCookie("id");
	
	//設定個人資訊
	if (id!="")
    {
		var data = {'id': id};
		
		$.ajax({
		async: false, 
		url:"personal_page.php", //抓取個人資料
		type:"post",
		data : data,
		dataType:"json",
		cache:false, 
		success:function(response){
		console.log(response); 
		
	    document.getElementById("name").innerHTML = response.server_response.name;
	    document.getElementById("emailAddress1").value = response.server_response.email;
		document.getElementById("password1").value = response.server_response.pw;
	    document.getElementById("color1").value = response.server_response.color;
		if(response.server_response.sex == "male")
		{
			document.getElementById("sex_male").checked = true;
		}
		else
		{
			document.getElementById("sex_female").checked = true;
		}
	    if(response.server_response.lgbt==1)
	    {
		   document.getElementById("LGBT").checked = true;
		}
		
		},
		error:function(err){
		alert("Ajax failure.");
		}
	});	   
    }
};

function getCookie(cname)
{
    var ss = document.cookie;
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0){
		return c.substring(name.length,c.length);} 
    }
        return "";
};

