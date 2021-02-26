"""Module defining class utilities functions for setting up SQL connection."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool


class SqlConnector(object):
    """Provides functions to setup MySQL connection ans session."""

    def __init__(self, user, instance, database, password=None,
                 port=3306):
        """Creates the engine used to connect to the MySQL database"""
        if password:
            self._engine = create_engine(
                "mysql+mysqldb://%s:%s@%s:%s/%s" %
                (user, password, instance, port, database), poolclass=NullPool)
        else:
            self._engine = create_engine(
                "mysql+mysqldb://%s@%s:%s/%s" %
                (user, instance, port, database), poolclass=NullPool)

    def get_sql_session(self):
        """Creates and returns a SQL session."""
        session_maker_obj = sessionmaker(bind=self._engine,
                                         expire_on_commit=False)
        session = session_maker_obj()
        return session
