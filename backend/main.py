from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.schemas import AddedPost

from database.service import add_post as add_post_to_db
from database.service import delete_posts as delete_posts_from_db
from database.service import get_posts as get_posts_from_db
from database.service import get_post_by_id as get_post_from_db

from bdCleaner.service import del_overdue_posts

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

@app.post("/add_post", response_model=dict)
async def add_post(post: AddedPost):
    await add_post_to_db(post)
    return {"data": post,
            "detail": "post added"}

@app.delete("/delete_post", response_model=dict)
async def delete_posts(post_id: int):
    data = await delete_posts_from_db(post_id)
    return {"data": f"post id - {post_id}",
            "detail": "post deleted"}

@app.get("/get_posts")
async def get_posts(shift: int = 0, limit: int = 10):
    posts = await get_posts_from_db(shift, limit)
    return posts

@app.get("/get_post_by_id/")
async def get_post_by_id(post_id: int):
    post = await get_post_from_db(post_id)
    return post

@app.delete("/del_overdue_posts")
async def del_overdue():
    await del_overdue_posts()




