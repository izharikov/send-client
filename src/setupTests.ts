import { config } from 'dotenv';
import path from 'path';

// Load .env.test file before running tests
config({ path: path.resolve(process.cwd(), '.env.test') });
