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



class Incidents(Base):
    __tablename__ = "Incidents"
    id = Column(String(50),primary_key=True)
    severity = Column(String(80),nullable=False)
    category = Column(String(80),nullable=False)
    device = Column(String(80),nullable=False)
    name = Column(String(80),nullable=False)
    status = Column(String(80),nullable=False) 
    starttime = Column(String(80),nullable=False)

def AllIncidents():
    session = connector.get_sql_session()
    result = session.query(Incidents).all()
    session.close()
    return result


def UpdateIncident(id, severity, category, device, name, status):
    session = connector.get_sql_session()
    row = session.query(Incidents).filter(Incidents.id == id).first()
    row.severity = severity
    row.category = category
    row.device = device
    row.name = name
    row.status = status
    session.add(row)
    session.commit()
    session.close()
    return row


def InsertIncident(id, severity, category, device, name, status, starttime):
    session = connector.get_sql_session()
    incident = Incidents(id=id, severity=severity, category=category, device=device, name=name, status=status, starttime=starttime)
    session.add(incident)
    session.commit()
    session.close()
    return incident


def DeleteIncident(id):
    session = connector.get_sql_session()
    row = session.query(Incidents).filter(Incidents.id == id).first()
    session.delete(row)
    session.commit()
    session.close()
    return row
