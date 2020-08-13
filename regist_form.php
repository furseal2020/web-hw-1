<?php


require_once 'init.php';
if ($conn->connect_error) die($conn->connect_error);

date_default_timezone_set('Asia/Taipei');

	
	$name = get_post($conn, 'name');
	$email = get_post($conn, 'email');
	$password = get_post($conn, 'pw');
	$confirm_pw = get_post($conn, 'confirm_pw');
	$color = get_post($conn, 'color');
	$sex = get_post($conn, 'sex');
	$LGBT = get_post($conn, 'LGBT');
	
	

$flag=0;

$sql_query = "select * from hw2 where name = '$name';";
$conn->query($sql_query);

if (mysqli_affected_rows($conn) ==-1) 
{
    $flag=0;
	
}
else if(mysqli_affected_rows($conn)==0)
{

		$datetime = date('Y-m-d H:i:s');
	
		if(($LGBT==TRUE))
		{
			$query = "INSERT INTO hw2 VALUES" . "('DEFAULT','$name', '$email', '$password', '$color', '$sex', $LGBT, '$datetime',NULL)"; //$LGBT : TRUE and FALSE are keywords, and should not be quoted as strings.
			$result = $conn->query($query);
	
			if (!$result) 
			{
				$flag=0;
			}
			else
			{
				$flag=1;
			}
		}
		else //undefined index($LGBT) goes here.
		{
			$query = "INSERT INTO hw2 VALUES" . "('DEFAULT','$name', '$email', '$password', '$color', '$sex', FALSE, '$datetime',NULL)"; //$LGBT : TRUE and FALSE are keywords, and should not be quoted as strings.
			$result = $conn->query($query);
	
			if (!$result) 
			{
				$flag=0;
			}
			else
			{
				$flag=1;
			}
		}
	    
	
}
else //查詢到>=1筆資料
{
	$flag=2;
}
$conn->close();
	
$array = array("flag" => $flag);
echo json_encode(array("server_response"=>$array));




function get_post($conn, $var)
{
  return $conn->real_escape_string($_POST[$var]);
}

?>