import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_EnC70KWZuYvP@ep-crimson-frost-a7dr4fkn-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(connectionString);
