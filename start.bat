@echo off

echo Starting Flask server with nodemon...
start cmd /k "cd /d C:\Users\abdul\OneDrive\Desktop\ChatbotDepression - Copy && set FLASK_ENV=development && nodemon"

echo Starting React Native development server...
start cmd /k "cd /d C:\Users\abdul\OneDrive\Desktop\ChatbotDepression - Copy && npm start"

pause
