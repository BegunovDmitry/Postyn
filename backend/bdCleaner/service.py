from datetime import datetime, timedelta

import asyncio

from database.service import get_posts_to_delete, delete_posts


def get_ip_from_overdue_posts(posts):
    ips = list(map(lambda x: x.id, filter(lambda x: x.create_date_time + timedelta(hours = x.storage_time__hours) <= datetime.utcnow(), posts)))
    return ips


async def del_overdue_posts():
    del_posts = await get_posts_to_delete()
    del_ips = get_ip_from_overdue_posts(del_posts)
    await delete_posts(del_ips)

