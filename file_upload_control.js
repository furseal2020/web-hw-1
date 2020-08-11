
var id = ""; //user_id
window.onload = getData;

$(document).ready(function (e){  
        $("#uploadForm").on('submit',(function(e){ 
            e.preventDefault(); 
			document.getElementById("user_id").value = id;
			
			var file_input = document.getElementById('myFile');	
			var get_file = file_input.files[0];
			
			var fileSize =  get_file.size / 1024 / 1024; // in MB
			if (fileSize > 4) 
			{
				alert("Upload Denied : File size cannot exceed 4MB.");
			}
			else
			{
				$.ajax({
				async: false, 
                url: "file_upload.php",
                type: "POST",
                data:  new FormData(this),
				dataType:"json",
				contentType: false, //傳送資料至 Server 的編碼類型 //使用ajax上傳文件時要將contentType設為false
                cache: false,
                processData:false,  //設定是否自動將 data 轉為 query string //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
                success: function(response){
					console.log(response); 
			
					if(response.server_response.flag==1)
					{
						alert("Upload Success.");
						
						document.getElementById("file_name").innerHTML = response.server_response.file_name;
						document.getElementById("file_size").innerHTML = response.server_response.file_size;
						document.getElementById("file_upload_time").innerHTML = response.server_response.file_date;
						document.getElementById("file_type").innerHTML = response.server_response.file_type;
						
						document.getElementById("file_name").href = "http://localhost/web_hw/"+ response.server_response.file_link;
						
						/* //此種作法會換行
						$("#img1").show();
						$("#file_name").show();
						$("#img2").show();
						$("#file_size").show();
						$("#img3").show();
						$("#file_type").show();
						$("#img4").show();
						$("#file_upload_time").show();
						*/
						
						displayShowUI("img1");
						displayShowUI("file_name");
						displayShowUI("img2");
						displayShowUI("file_size");
						displayShowUI("img3");
						displayShowUI("file_type");
						displayShowUI("img4");
						displayShowUI("file_upload_time");
						
						
					}
					else if (response.server_response.flag==0)
					{
						alert("Upload Failed.");						
					}
					else //flag==2
					{
						alert("Upload Denied : File already exists!");
					}
                },
                error: function(){
					alert("Ajax Failure : Upload File.");
                }               
                });
				
			}
        }));
    });
	
function displayShowUI(id)
{
	var ui = document.getElementById(id);
	ui.style.display="";//令display為空比較好，因為display="block"會造成換行 
}

function getData()
{
	id=getCookie("id");
	
	if (id!="")
    {
		var data = { 'id': id };
		
		$.ajax({
		async: false, 
		url:"file_upload_init.php",
		type:"post",
		data : data,
		dataType:"json", 
		cache:false, 
		success:function(response){
		console.log(response); 
		
	    document.getElementById("name").innerHTML = response.server_response.name;
		
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


function show_file_name()
{
	var e = e || window.event; //如果存在event,那么var e=event;而如果不存在event，那么var e=window.event.
	var files = e.target.files;
	var fileName = files[0].name;
	document.getElementById("file_selected").innerHTML = fileName;
};


function downloadFile()
{
    filePath = document.getElementById("file_name").href;
	var link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
};


