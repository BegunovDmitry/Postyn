from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Post(Base):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    content = Column(String(6000), nullable=False)
    create_date_time = Column(DateTime, default=datetime.utcnow)
    storage_time__hours = Column(Integer, default=168)
