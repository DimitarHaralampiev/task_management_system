from fastapi import Depends, HTTPException
from app import crud


def get_current_active_user(current_user: Depends(crud.get_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user