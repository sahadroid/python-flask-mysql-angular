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
![canopyscreen](https://user-images.githubusercontent.com/27715383/109381082-af24f200-790a-11eb-8f27-26874ba66e66.png)

Log User Subscribes
![canopyscreen](https://user-images.githubusercontent.com/27715383/109381158-2bb7d080-790b-11eb-9071-7d27b25e5150.png)


Update Edit Data User
![canopyscreen](https://user-images.githubusercontent.com/27715383/109381121-ebf0e900-790a-11eb-95f6-6f9a581ff5e4.png)

Add New Record Form Record
![adddata](https://user-images.githubusercontent.com/27715383/109252250-a3a8cc80-781f-11eb-999d-cb0ca62f242b.png)
