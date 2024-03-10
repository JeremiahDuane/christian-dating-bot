import dotenv from 'dotenv';
import { initDiscord } from "./discord/discord";

dotenv.config();

initDiscord();
initReddit();
