<?php
/**
 * This file will require PHPMailer functions and send emails.
 * 
 * @package JAW
 * @since 1.0.1
 */

$json = json_decode(file_get_contents("php://input"));
$walletAddress = $json->walletAddress;


$currentDT = date('Y-m-d h:i:s');
$currentIP = $_SERVER['REMOTE_ADDR'];

 include 'connection.php'; 


 $query = "SELECT * FROM whaleSchema.airDropAddresses
 where walletAddress = '".$walletAddress."'";
 
 
$result = $conn->query($query);


if ($result) {
    if (mysqli_num_rows($result) > 0) {
        
		echo json_encode('found');

    } else {
		$sql = "INSERT INTO whaleSchema.airDropAddresses (walletAddress, dateTime, IPAddress)
		VALUES ('".$walletAddress."', '".$currentDT."', '".$currentIP."')";
		
		if ($conn->query($sql) === TRUE) {
		echo json_encode($walletAddress);
		} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
    }
} else {
    echo 'Error: ' . mysqli_error();
}

 

 ?>