# python-flask-mysql-angular

# Setup:
##  Copy & pastable commands:




git clone https://github.com/sahadroid/python-flask-mysql-angular.git 

Run Your MySQL Server : (Xampp, Lampp) or other 

Create database in mysql :

	database name : canopy 
	import : canopy.sql

open terminal as admin 
cd python-flask-mysql-angular



# Run Application:

### Add DB configurations in config.py.

Sample:

    class SQLConfig:
        USER_ID = <db_user>
        PASSWORD = <db_user's_password>
        IP = <db_ip>
        DB = <database_name>

### Run command:

    python webapp.py

### Use Instance's external IP to access the application in web browser.

    http:127.0.0.1:5000


### Screenshoot:

ListRecord
![listrecord](https://user-images.githubusercontent.com/27715383/109251806-b5d63b00-781e-11eb-878d-0e4fec2c69fe.png)	

Update Form Record
![updatedata](https://user-images.githubusercontent.com/27715383/109252129-5fb5c780-781f-11eb-97c3-9c7bc9d263e3.png)
