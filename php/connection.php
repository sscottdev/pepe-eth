<?php
/**
 * This file will require PHPMailer functions and send emails.
 * 
 * @package JAW
 * @since 1.0.1
 */


 $servername = "localhost";
 $username = "whalePHPuser";
 $password = "SKf)!3IPR&Zz";
 $db = "whaleSchema";
 // Create connection
 $conn = mysqli_connect($servername, $username, $password,$db);
 // Check connection
 if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
 }

 ?>