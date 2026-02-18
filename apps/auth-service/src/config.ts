import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This reaches up to find the .env in apps/auth-service/
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("🛠️  Config loaded. DB URL Present:", !!process.env.DATABASE_URL);