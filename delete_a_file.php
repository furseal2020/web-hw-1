<?php
require "init.php";

$user_id=$_POST["user_id"];
$file_name=$_POST["file_name"];

$flag = 0;

$sql = "select * from files where user_id='$user_id' and file_name='$file_name';";
$result=mysqli_query($conn,$sql);

if (mysqli_affected_rows($conn) ==-1 || mysqli_affected_rows($conn)==0) 
{
    $flag = 0; 
}
else
{
    $row=mysqli_fetch_row($result);
    if(mysqli_query($conn,"delete from files where id='$row[0]';"))
	{
		$flag = 1;
	}
	else
	{
		$flag = 0;
	}
}

	$array = array("flag" => $flag);
	echo json_encode(array("server_response"=>$array));
	
	$result->close();
	$conn->close();

?>