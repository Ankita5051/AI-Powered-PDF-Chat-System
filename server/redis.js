import Redis from "ioredis";

// Connect to Redis (default: localhost:6379)
const redis = new Redis({
  host: "127.0.0.1", // change if using cloud Redis
  port: 6379,
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;
