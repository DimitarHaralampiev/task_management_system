import datetime

from sqlalchemy import Integer, String, Date, Column, DateTime, Enum, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base
import enum


class PriorityEnum(enum.Enum):
    low = 'low'
    medium = 'medium'
    high = 'high'


class StatusEnum(enum.Enum):
    pending = 'pending'
    in_progress = 'in_progress'
    complete = 'complete'


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    tasks = relationship('Task', back_populates='owner')


class Task(Base):
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    due_date = Column(DateTime)
    priority = Column(Enum(PriorityEnum))
    status = Column(Enum(StatusEnum))
    assigned_to = Column(String)
    created_at = Column(DateTime, default=datetime.date.today)
    updated_at = Column(Date, default=datetime.date.today, onupdate=datetime.date.today)

    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship('User', back_populates='tasks')