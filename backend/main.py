from datetime import datetime, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.schemas import AddedPost

from database.service import add_post as add_post_to_db
from database.service import delete_posts as delete_posts_from_db
from database.service import get_posts as get_posts_from_db
from database.service import get_post_by_id as get_post_from_db

from bdCleaner.service import del_overdue_posts

import aioredis

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    redis = await aioredis.create_redis_pool('redis://localhost')
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield

app = FastAPI(lifespan=lifespan)

@cache()
async def get_cache():
    return 1

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
    redis = await aioredis.create_redis_pool('redis://localhost')
    last_deleting = await redis.get('last_deleting_time')
    if last_deleting:
        last_deleting = last_deleting.decode("utf-8")
        last_deleting = datetime.strptime(last_deleting, '%m/%d/%Y %H:%M:%S')
    if (not(last_deleting) or (last_deleting + timedelta(hours=1)) < datetime.utcnow()):
        await del_overdue_posts()
        await redis.set('last_deleting_time', datetime.utcnow().strftime('%m/%d/%Y %H:%M:%S'))
        print("Overdue post deleted!")
    redis.close()

    posts = await get_posts_from_db(shift, limit)
    return posts

@app.get("/get_post_by_id/")
@cache(expire=60)
async def get_post_by_id(post_id: int):
    post = await get_post_from_db(post_id)
    return post




