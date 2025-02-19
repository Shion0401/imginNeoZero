from sqlalchemy import create_engine
import sys
from sqlalchemy.orm import (sessionmaker, scoped_session)

sys.dont_write_bytecode = True

#setting db connection
url = "mysql+pymysql://neozero:passwordneozero@neozero-rds.c3wq4nmnvs2r.us-east-1.rds.amazonaws.com:3306/neozerords?charset=utf8"
engine = create_engine(url, echo=False, pool_recycle=10)

#create session
def create_new_session():
    return  scoped_session(sessionmaker(autocommit=False, autoflush=True, expire_on_commit=False, bind=engine))
