import { Pool } from "pg";

export default new Pool({
  user: "postgres",
  password: "014352",
  host: "localhost",
  port: 5432,
  database: "proffy",
});
