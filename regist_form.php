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

if (($password != $confirm_pw) || ($password=="") || ($confirm_pw ==""))
{
	echo "<font color='red'>Please check your password.</font>";

}
else
{
	$datetime = date('Y-m-d H:i:s');
	
	if(($LGBT==TRUE))
    {
		$query = "INSERT INTO hw2 VALUES" . "('DEFAULT','$name', '$email', '$password', '$color', '$sex', $LGBT, '$datetime',NULL)"; //$LGBT : TRUE and FALSE are keywords, and should not be quoted as strings.
		$result = $conn->query($query);
	
		if (!$result) echo "INSERT failed: $query<br>" . $conn->error . "<br><br>";
	}
	else //undefined index($LGBT) goes here.
	{
		$query = "INSERT INTO hw2 VALUES" . "('DEFAULT','$name', '$email', '$password', '$color', '$sex', FALSE, '$datetime',NULL)"; //$LGBT : TRUE and FALSE are keywords, and should not be quoted as strings.
		$result = $conn->query($query);
	
		if (!$result) echo "INSERT failed: $query<br>" . $conn->error . "<br><br>";
	}
    
}



/*
$query = "SELECT * FROM hw2";
$result = $conn->query($query);
if (!$result) die ("Database access failed: " . $conn->error);
$rows = $result->num_rows;
for ($j = 0 ; $j < $rows ; ++$j)
{
$result->data_seek($j);
$row = $result->fetch_array(MYSQLI_NUM);

echo <<<_END
<pre>
ID : $row[0]
Name : $row[1]
Email Address : $row[2]
Password : $row[3]
Favorite Color : $row[4]
Sex : $row[5]
LGBT : $row[6]
Registration Time : $row[7]
</pre>
_END;

}
*/

$result->close();
$conn->close();

function get_post($conn, $var)
{
  return $conn->real_escape_string($_POST[$var]);
}

?>