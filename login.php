<?php

require_once 'init.php';
if ($conn->connect_error) die($conn->connect_error);

$flag=0;
$id=-1;


	$name = get_post($conn, 'name');
	$password = get_post($conn, 'pw');
    
	
	$query = "SELECT * FROM hw2";    
	$result = $conn->query($query);
	if (!$result) die ("Database access failed: " . $conn->error);
	
	$rows = $result->num_rows;
	for ($j = 0 ; $j < $rows ; ++$j)
	{
		$result->data_seek($j);
		$row = $result->fetch_array(MYSQLI_NUM);

        if($name==$row[1])
		{
			if($password==$row[3])
			{
				$flag=1; //login success
				$id=$row[0];
			}
		}		
	}
	$array = array("flag" => $flag, "id" => $id);
	echo json_encode(array("server_response"=>$array));
	
	
	$result->close();
	$conn->close();
	
	
	
	function get_post($conn, $var)
	{
		return $conn->real_escape_string($_POST[$var]);
	}

?>