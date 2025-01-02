import Redis from "ioredis"

import ServerConfig from "./serverConfig"

const redisConfig = {
    port: parseInt(process.env.REDIS_PORT || "6379", 10), // Convert to number with a default
    host: ServerConfig.REDIS_HOST || "127.0.0.1",
    maxRetriesPerRequest:null         // Default to localhost
  };
  
  

const redisConnection = new Redis(redisConfig)

export default redisConnection