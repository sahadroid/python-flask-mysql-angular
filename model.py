import datetime  
from config import SQLConfig
from sqlalchemy import (Column, Integer, String, ForeignKey, Text, DateTime,
                        Time, Boolean)
from sqlalchemy.ext.declarative import declarative_base
from sql_connector import SqlConnector


Base = declarative_base()


#connector = SqlConnector('root', 'host', 'database', password='root')
connector = SqlConnector(
    SQLConfig.USER_ID, SQLConfig.IP, SQLConfig.DB, password=SQLConfig.PASSWORD)



class Subcribes(Base):
    __tablename__ = "Subcribes"
    id_subscribe = Column(String(50),primary_key=True)
    created_date = Column(DateTime(),nullable=False)
    id_users = Column(String(50),nullable=False)
    periode = Column(String(100),nullable=False)

def UpdateSubscribe(id_subscribe, created_date, id_users, periode):
    session = connector.get_sql_session()
    subscribe = Subcribes(id_subscribe=id_subscribe, created_date=created_date, id_users=id_users, periode=periode)
    session.add(subscribe)
    session.commit()
    session.close()


class Users(Base):
    __tablename__ = "Users"
    id_users = Column(String(50),primary_key=True)
    fullname = Column(String(80),nullable=False)
    phone = Column(String(80),nullable=False)
    email = Column(String(80),nullable=False)
    created_date = Column(DateTime(),nullable=False)
    status_active = Column(String(1),nullable=False)
    periode_weekly = Column(String(1),nullable=False)    
    periode_monthly = Column(String(1),nullable=False)   
    
def AllUsers():
    session = connector.get_sql_session()
    result = session.query(Users).order_by(Users.created_date.desc()).all()
    session.close()
    return result


    
def UpdateUser(id_users, fullname, phone, email, periode_weekly, periode_monthly):
    session = connector.get_sql_session()
    row = session.query(Users).filter(Users.id_users == id_users).first()
    row.fullname = fullname
    row.phone = phone
    row.email = email
    session.add(row)
    session.commit()
    session.close()
    return row


def UpdateSubscribeActive(id_users, status):
    session = connector.get_sql_session()
    row = session.query(Users).filter(Users.id_users == id_users).first()
    
    if status == "Y":
        row.status_active = "N"     
    else:
        row.status_active = "Y"     
    session.add(row)
    session.commit()
    session.close()
    return row

def UpdateSubscribeUser(id_users, periode, status):
    session = connector.get_sql_session()
    row = session.query(Users).filter(Users.id_users == id_users).first()
    
    if periode == "weekly":
        if status == "Y":            
            row.periode_weekly = "N"
        else:
            row.periode_weekly = "Y"
    else:
        if status == "Y":            
            row.periode_monthly = "N"
        else:
            row.periode_monthly = "Y"        
    session.add(row)
    session.commit()
    session.close()


def InsertUser(id_users, fullname, phone, email, created_date, status_active, periode_weekly, periode_monthly):
    session = connector.get_sql_session()
    user = Users(id_users=id_users, fullname=fullname, phone=phone, email=email, created_date=created_date, status_active=status_active, periode_weekly=periode_weekly, periode_monthly=periode_monthly)
    session.add(user)
    session.commit()
    session.close()
    return user


def DeleteUser(id_users):
    session = connector.get_sql_session()
    row = session.query(Users).filter(Users.id_users == id_users).first()
    session.delete(row)
    session.commit()
    session.close()
    return row