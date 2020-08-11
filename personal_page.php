<?php

    require_once 'init.php';
    if ($conn->connect_error) die($conn->connect_error);

	$id = get_post($conn, 'id');
	
	$sql = "select * from hw2 where id='$id';";
    $result=mysqli_query($conn,$sql);

    if (mysqli_affected_rows($conn) ==-1 || mysqli_affected_rows($conn)==0) 
    {
        echo "Error for searching the data with id = ".$id;
	}
	else
	{
		$row = mysqli_fetch_row($result);
		$name = $row[1];
		$email = $row[2];
		$color = $row[4];
		$sex = $row[5];
		$lgbt = $row[6];
		$date =$row[7];
		$img = $row[8];
		$pw = $row[3];
		
		$array = array("name" => $name, "email" => $email, "color" => $color,"sex" => $sex, "lgbt" => $lgbt, "date" => $date, "img" => $img, "pw" => $pw);
		echo json_encode(array("server_response"=>$array));
			
	}
	
	$result->close();
	$conn->close();
	
	function get_post($conn, $var)
	{
		return $conn->real_escape_string($_POST[$var]);
	}
?>