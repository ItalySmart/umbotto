import Redis from "ioredis";
import cfg from "./config";

const client = new Redis(6379, cfg.redisHost);

export default client;
