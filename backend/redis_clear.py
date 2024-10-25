import asyncio
import aioredis

async def gogo():
    redis = await aioredis.create_redis_pool('redis://localhost')
    keys = await redis.keys("*")
    sum = 0
    for key in keys:
        value = await redis.delete(key)
        sum += value

    redis.close()
    await redis.wait_closed()
    print(f"Done!\n{sum} - posts deleted.")

asyncio.run(gogo())