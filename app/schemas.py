from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models import PriorityEnum, StatusEnum


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: datetime
    priority: PriorityEnum
    status: StatusEnum


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    tasks: List[Task] = []

    class Config:
        orm_mode = True