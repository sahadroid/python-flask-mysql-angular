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
![canopyscreen](https://user-images.githubusercontent.com/27715383/109784207-69836480-7c3d-11eb-97ee-1ec81181c213.png)

Log User Subscribes
![canopyscreen](https://user-images.githubusercontent.com/27715383/109784351-92a3f500-7c3d-11eb-953f-abced93d2f29.png)


Update Edit Data User
![canopyscreen](https://user-images.githubusercontent.com/27715383/109381121-ebf0e900-790a-11eb-95f6-6f9a581ff5e4.png)

Register New User
![canopyscreen](https://user-images.githubusercontent.com/27715383/109381189-5d309c00-790b-11eb-8955-45cb37a8e5a1.png)
