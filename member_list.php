<?php

	require_once 'init.php';
	if ($conn->connect_error) die($conn->connect_error);

	$sql = "select id, name, email, color, sex from hw2;";

	$result=mysqli_query($conn,$sql);
	$response=array();

	while($row=mysqli_fetch_array($result))
	{
		array_push($response,array("id"=>$row[0],"name"=>$row[1],"sex"=>$row[4],"color"=>$row[3],"email"=>$row[2]));
	}

	echo json_encode(array("server_response"=>$response));

	mysqli_close($conn);


?>