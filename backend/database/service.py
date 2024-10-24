from typing import Any

from sqlalchemy import desc, delete
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.sql import select

from config import settings

from database.schemas import AddedPost
from database.models import Post as PostSQL

engine = create_async_engine(
    f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.HOST}:{settings.PORT}/{settings.DB_NAME}")
async_session = AsyncSession(engine, expire_on_commit=False)


async def add_post(post: AddedPost):
    async with async_session:
        added_post = PostSQL(**post.__dict__)
        async_session.add(added_post)
        await async_session.commit()


async def delete_posts(post_id: int | list):
    post_ids = set()
    post_ids.add(post_id)

    async with async_session:
        stmt = delete(PostSQL).where(PostSQL.id.in_(post_ids))
        await async_session.execute(stmt)
        await async_session.commit()


async def get_posts(shift: int, limit: int):
    async with async_session:
        stmt = select(PostSQL).order_by(desc("id")).limit(limit).offset(shift)
        posts = await async_session.execute(stmt)
        posts = posts.scalars().all()

        return posts

async def get_post_by_id(post_id: int):
    async with async_session:
        return await async_session.get(PostSQL, post_id)

async def get_posts_to_delete():
    async with async_session:
        stmt = select(PostSQL.id, PostSQL.create_date_time, PostSQL.storage_time__hours)
        stmt = await async_session.execute(stmt)
        stmt = stmt.all()
        return stmt
