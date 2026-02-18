@echo off
REM Script para iniciar Apache desde XAMPP

echo Iniciando Apache...
cd C:\xampp\apache\bin

REM Detener si ya está corriendo
taskkill /IM httpd.exe /F 2>nul

REM Esperar un segundo
timeout /t 1 /nobreak

REM Iniciar Apache en modo servicio
.\httpd.exe -k start

echo.
echo Apache iniciado. Presione cualquier tecla...
pause
