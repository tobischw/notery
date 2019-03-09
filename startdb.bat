set DBPATH=./db
set /A DBPORT=27017

mongod --dbpath=%DBPATH% --port=%DBPORT%
pause