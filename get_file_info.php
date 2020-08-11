<?php

	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);
	
	$user_id=$_POST["user_id"];

	$sql = "select file_name, file_link, file_size, file_date from files where user_id = '$user_id';";

	$result=mysqli_query($conn,$sql);
	$response=array();

	while($row=mysqli_fetch_array($result))
	{
		array_push($response,array("file_name"=>$row[0],"file_size"=>$row[2],"file_date"=>$row[3],"file_link"=>$row[1]));
	}

	echo json_encode(array("server_response2"=>$response));

	$result->close();
	$conn->close();


?>