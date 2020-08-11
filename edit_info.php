<?php
require "init.php";
$id=$_POST["id"];
$email=$_POST["email"];
$pw=$_POST["pw"];
$color=$_POST["color"];
$sex=$_POST["sex"];
$lgbt=$_POST["lgbt"];


$sql = "select * from hw2 where id='$id';";
$result=mysqli_query($conn,$sql);

$flag = 0;

if (mysqli_affected_rows($conn) ==-1 || mysqli_affected_rows($conn)==0) 
{
    //Do nothing.
}
else
{
    $row=mysqli_fetch_row($result);
    
    if($email!=$row[2])
    {
        mysqli_query($conn,"update hw2 set email='$email' where id='$id';");
    }
    if($pw!=$row[3])
    {
        mysqli_query($conn,"update hw2 set password='$pw' where id='$id';");
    }
    if($color!=$row[4])
    {
        mysqli_query($conn,"update hw2 set color='$color' where id='$id';");
    }
    if($sex!=$row[5])
    {
        mysqli_query($conn,"update hw2 set sex='$sex' where id='$id';");
    }
    if($lgbt!=$row[6])
    {
        mysqli_query($conn,"update hw2 set LGBT='$lgbt' where id='$id';");
    }

    $flag =1;
    
	$array = array("flag" => $flag);
	echo json_encode(array("server_response"=>$array));
	
}
$result->close();
$conn->close();
?>