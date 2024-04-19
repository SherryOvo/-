<?php    
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// 数据库连接信息    
$servername = "e1ccb8e6340d";   
$username = "root";    
$password = "123456";  
$dbname = "mysql";  
    
// 创建连接    
$conn = new mysqli($servername, $username, $password, $dbname);    
    
// 检查连接    
if ($conn->connect_error) {    
    die("连接失败: " . $conn->connect_error);    
}    
    
// 收集表单数据    
$name = $conn->real_escape_string($_POST['name']);    
$email = $conn->real_escape_string($_POST['email']);    
$subject = $conn->real_escape_string($_POST['subject']);    
$message = $conn->real_escape_string($_POST['message']);    
    
// 准备插入语句    
$sql = "INSERT INTO MizoZuTable (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";  
  
if ($conn->query($sql) === TRUE) {    
    echo "数据插入成功";    
} else {    
    echo "Error: " . $conn->error;    
}    
    
$conn->close();    
?>