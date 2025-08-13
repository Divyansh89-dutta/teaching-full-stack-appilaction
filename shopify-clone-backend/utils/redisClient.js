import { createClient } from "redis";

console.log("🔍 REDIS_URL from .env:", process.env.REDIS_URL);

const redisClient = createClient({
  username: 'default',
  password: 'T6Iimns1LZpeloRr5N4spGcvY8mJdmkh',
  socket: {
    host: 'redis-17714.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 17714
  }
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis Cloud connected");
  }
};

export { redisClient, connectRedis };
