from pydantic import BaseModel
from datetime import datetime

class BasePost(BaseModel):
    title: str
    content: str
    storage_time__hours: int = 168

class AddedPost(BasePost):
    pass

class FullPost(BasePost):
    id: int
    create_date_time: datetime
