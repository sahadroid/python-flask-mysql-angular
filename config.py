import os

class SQLConfig:
    USER_ID = 'root'
    PASSWORD = ''
    IP = os.getenv('DB_SERVER', 'localhost')
    DB = os.getenv('DB_NAME ', 'canopy') 

