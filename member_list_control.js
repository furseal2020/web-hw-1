window.onload = getMemberInfo;

function getMemberInfo()
{
	var json_str;
	
	$.ajax({
		async: false,   
		url:"member_list.php",
		type:"post",
		dataType:"json", 
		cache:false,     
		success:function(response){ 
	    json_str = response.server_response;
		},
		error:function(err){
		alert("Ajax failure.");
		}
	});
	
    $("#member_table").bootstrapTable({ 
	  data : json_str,
	  
      columns: [
          {
              field: 'id', 
              title: 'ID', 
              align: 'center', 
              valign: 'middle' 
          }, {
              field: 'name', 
              title: 'Name', 
              align: 'center', 
              valign: 'middle' 
          }, {
              field: 'sex',
              title: 'Sex',
              align: 'center',
              valign: 'middle'
          }, {
              field: 'color',
              title: 'Color',
              align: 'center',
              valign: 'middle'
	      }, {
              field: 'email', 
              title: 'Email', 
              align: 'center', 
              valign: 'middle' 
          }
      ]

	})
};



