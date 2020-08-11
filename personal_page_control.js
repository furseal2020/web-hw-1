
var id = "";
window.onload = getData;

$(document).ready(function (e){  //用JavaScript操縱網頁的DOM元素時，必須等網頁完全載入後才可安全地進行操作，而要確保網頁載入，可使用jQuery的$( document ).ready()。
        $("#uploadForm").on('submit',(function(e){ //The on() method attaches one or more event handlers for the selected elements and child elements.
            e.preventDefault(); //取消事件的默认动作。
			document.getElementById("user_id").value = id;
            $.ajax({
				async: false, 
                url: "avatar_upload.php",
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
					}
					else
					{
						alert("Upload Failed.");						
					}    
                },
                error: function(){
					alert("Ajax Failure : Upload image.");
                }               
            });
        }));
    });
 
function getData()
{
	id=getCookie("id");
	
	//設定個人資訊
	if (id!="")
    {
		var data = { 'id': id };
		
		$.ajax({
		async: false, //其實是因為 $.ajax 方法預設的 async:true 啟動非同步方法，也就是說並不會等 $.ajax 執行完成才 return ，而是一開始就直接 return 了。Ref:https://www.dotblogs.com.tw/jasonyah/2013/06/02/use-ajax-you-need-to-be-care
		url:"personal_page.php",
		type:"post",
		data : data,
		dataType:"json", //dataType:要放的是 Server 傳回的資料類型
		cache:false, //筆者記得似乎當時在 IE8 上就碰到因為預設 cache 為 true ，導致每次抓回來的資料都一樣，所以如果要避免抓回來都是舊的資料還是把 cache 設為 false
		success:function(response){
		console.log(response); 
		
	    document.getElementById("name").innerHTML = response.server_response.name;
	    document.getElementById("email").innerHTML = response.server_response.email;
	    document.getElementById("color").innerHTML = response.server_response.color;
	    if(response.server_response.lgbt==1)
	    {
		   document.getElementById("sex").innerHTML = response.server_response.sex + ' (LGBT)';
		}
		else
		{
			document.getElementById("sex").innerHTML = response.server_response.sex;
		}
	    document.getElementById("time").innerHTML = response.server_response.date;
		if(response.server_response.img != null)
		{
			document.getElementById("img").src = response.server_response.img;
		}
		
		},
		error:function(err){
		alert("Ajax failure.");
		}
	});	   
    }
	getFileData();
	
	
};

function getFileData()
{
	//設定檔案資訊
	var json_str;
	var data = {"user_id" : id};
	
	$.ajax({
		async: false,   
		url:"get_file_info.php",
		type:"post",
		data : data,
		dataType:"json", 
		cache:false,     
		success:function(response){ 
	    json_str = response.server_response2;
		},
		error:function(err){
		alert("Ajax failure.");
		}
	});
	
	$(function() {
    new Vue({
      el: '#file_table',
      components: {
        'BootstrapTable': BootstrapTable
      },
      data: {
        columns: [
          {
              field: 'file_name', 
              title: 'File Name', 
              align: 'center', 
              valign: 'middle' 
          }, {
              field: 'file_size', 
              title: 'File Size', 
              align: 'center', 
              valign: 'middle' 
          }, {
              field: 'file_date',
              title: 'Upload Timestamp',
              align: 'center',
              valign: 'middle'
          }, {
              field: 'file_link',
              title: 'Edit',
              align: 'center',
              valign: 'middle',
			  formatter:function(value,row,index,field){ 
				console.log(value);
				console.log(row.file_link);
				console.log(index);
				console.log(field);
								
				return [
				'<button type="button" class="btn btn-info btn-sm rename_onclick"><i class="fa fa-angle-double-right"></i>Rename</button>', 
				'<button type="button" class="btn btn-info btn-sm delete_onclick"><i class="fa fa-angle-double-right"></i>Delete</button>',
				'<button type="button" class="btn btn-info btn-sm download_onclick"><i class="fa fa-angle-double-right"></i>Download</button>'
          
				].join(' ');
			  },
			  events: {
              'click .rename_onclick': function (e, value, row) {
				var new_file_name = prompt("Please enter your new file name:", "");
				if (new_file_name == null || new_file_name == "") {
				  //不更改檔案名稱
				} else {
					var file_name = row.file_name;
					var data = {"user_id" : id, "file_name" : file_name, "new_file_name": new_file_name};
					
					$.ajax({
					async: false,   
					url:"modify_file_name.php",
					type:"post",
					data : data,
					dataType:"json",
					cache:false, 
					success:function(response){ 
					if (response.server_response.flag == 1)
					{
						alert("File Rename Success. Please Refresh the page to see the new file name.");
					}
					else
					{
						alert("File Rename Failed.")
					}
					},
					error:function(err){
					alert("Ajax failure.");
				}
				});
				
				}
               },
			   'click .delete_onclick': function (e, value, row) {
				if (confirm("Are you sure you want to delete this file?")) {
					var file_name = row.file_name;
					var data = {"user_id" : id, "file_name" : file_name};
					
					$.ajax({
					async: false,   
					url:"delete_a_file.php",
					type:"post",
					data : data,
					dataType:"json",
					cache:false, 
					success:function(response){ 
					if (response.server_response.flag == 1)
					{
						alert("File Deletion Success. Please Refresh the page.");
					}
					else
					{
						alert("File Deletion Failed.")
					}
					},
					error:function(err){
					alert("Ajax failure.");
				}
				});
				
				} else {
				 //取消刪除的動作
				}
				document.getElementById("demo").innerHTML = txt;
               },
			   'click .download_onclick': function (e, value, row) {				
				var filePath = row.file_link;
                var link = document.createElement('a');
				link.href = "http://localhost/web_hw/" + filePath;
				link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
				link.click();
               }			   
              }  			  
	        }
        ],
        data: json_str
      }
    })
  })
	 
};
		
function getCookie(cname)
{
    var ss = document.cookie; 
	console.log(ss);          //id=xx
    var name = cname + "=";   //id=
    var ca = document.cookie.split(';');
	console.log(ca); //ca[0]存id=xx
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
		console.log(c);   //id=xx
        if (c.indexOf(name)==0){
		return c.substring(name.length,c.length);} //索引位置從 0 開始，頭取尾不取
    }
        return "";
};


var loadFile = function(event) {
	var img = document.getElementById('img');
	img.src = URL.createObjectURL(event.target.files[0]);
};



