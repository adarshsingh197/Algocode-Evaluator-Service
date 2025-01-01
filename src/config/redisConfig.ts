import Redis from "ioredis"

import ServerConfig from "./serverConfig"

const redisConfig = {
    port: parseInt(process.env.REDIS_PORT || "6379", 10), // Convert to number with a default
    host: process.env.REDIS_HOST || "127.0.0.1",         // Default to localhost
  };
  
  

const redisConnection = new Redis(redisConfig)

export default redisConnection