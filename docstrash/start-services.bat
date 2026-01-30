@echo off
REM Start XAMPP Apache and MySQL

echo Iniciando XAMPP Services...

REM Start Apache
echo Starting Apache...
cd C:\xampp\apache\bin
httpd.exe -k start

REM Start MySQL
echo Starting MySQL...
cd C:\xampp\mysql\bin
mysqld.exe --default-storage-engine=InnoDB

echo XAMPP Services iniciados!
echo Accede a: http://localhost/provivirpanama/cms/login.php
pause
