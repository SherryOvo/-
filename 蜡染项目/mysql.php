<?php  
// 数据库连接信息  
$servername = "unruffled_galois"; 
$username = "root";  
$password = "123456";
$dbname = "my_mysql";
  
// 创建连接  
$conn = new mysqli($unruffled_galois, $root, $123456, $my_mysql);  
  
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
$sql = "INSERT INTO MizoZuTable (name) VALUES ('$name')";  
$sql = "INSERT INTO MizoZuTable (email) VALUES ('$email')";  
$sql = "INSERT INTO MizoZuTable (subject) VALUES ('$subject')";   
$sql = "INSERT INTO MizoZuTable (message) VALUES ('$message')";  

if ($conn->query($sql) === TRUE) {  
    echo "数据插入成功";  
} else {  
    echo "Error: " . $sql . "<br>" . $conn->error;  
}  
  
$conn->close();  
?>