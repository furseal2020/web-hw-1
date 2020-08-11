<?php

	require_once 'init.php';
    if ($conn->connect_error) die($conn->connect_error);
	
	date_default_timezone_set('Asia/Taipei');

	$user_id = get_post($conn, 'user_id');
	$flag = 0;
	
	$file_name = $_FILES['myFile']['name'];
	$sql = "select * from files where user_id='$user_id' and file_name='$file_name';";
	$result=mysqli_query($conn,$sql);

	if (mysqli_affected_rows($conn)==0) //這個使用者還沒有上傳過這個檔案
	{	
	if(is_array($_FILES)) 
	{
        if(is_uploaded_file($_FILES['myFile']['tmp_name'])) 
		{
            $sourcePath = $_FILES['myFile']['tmp_name'];
            $targetPath = "file_uploaded/".$_FILES['myFile']['name']; 

			if(move_uploaded_file($sourcePath,$targetPath)) 
			{
				$file_name = $_FILES['myFile']['name'];				
				$file_link = $targetPath;
				$file_size = round($_FILES['myFile']['size']/1024,2);//in KB.
				$file_size = $file_size." KB"; 
				$file_date = date('Y-m-d H:i:s');				
				
				$sql_query = "INSERT INTO files VALUES" . "('DEFAULT','$user_id','$file_name','$file_link','$file_size','$file_date')";
				if(mysqli_query($conn,$sql_query)) //Insertion Success.
				{
					$flag=1;
					$ext = get_extension($_FILES['myFile']['name']);
				}
				else //Insertion Failed.
				{
					$flag=0;
				}
			}
		}
	}
	}
	else if(mysqli_affected_rows($conn)==-1)
	{
		$flag=0; 
	}
	else //這個使用者已經上傳過這個檔案
	{
		$flag=2;
	}
	
	if($flag==1)
	{
		$array = array("flag"=>$flag, "file_name"=>$file_name, "file_link"=>$file_link,"file_size"=>$file_size,"file_date"=>$file_date,"file_type"=>$ext);
		echo json_encode(array("server_response"=>$array));
	}
	else //flag==2 || flag==0
	{
		$array = array("flag"=>$flag);
		echo json_encode(array("server_response"=>$array));
	}
	
	
	$conn->close();
	
	function get_extension($file)
	{
		return pathinfo($file, PATHINFO_EXTENSION);
	}
	
	function get_post($conn, $var)
	{
		return $conn->real_escape_string($_POST[$var]);
	}
?>