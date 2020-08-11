<?php
	require_once 'init.php'; 
    if ($conn->connect_error) die($conn->connect_error);
	
	$id = get_post($conn, 'user_id');
	$flag = 0;
	
	if(is_array($_FILES)) 
	{
        if(is_uploaded_file($_FILES['myAvatar']['tmp_name'])) 
		{
            $sourcePath = $_FILES['myAvatar']['tmp_name'];
            //$targetPath = "photo_uploaded/avatar/".$_FILES['myAvatar']['name']; 
			$ext = get_extension($_FILES['myAvatar']['name']);
			$targetPath = "photo_uploaded/avatar/".$id.".".$ext; //同檔名的話會被覆蓋過去。
			if(move_uploaded_file($sourcePath,$targetPath)) 
			{
				$sql_query = "update hw2 set img='$targetPath' where id='$id';";
				if(mysqli_query($conn,$sql_query)) //Update Success.
				{
					$flag=1;
				}
				else //Update Failed.
				{
					$flag=0;
				}
			}
		}
	}
	
		
	$array = array("flag"=>$flag);
	echo json_encode(array("server_response"=>$array));
	
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