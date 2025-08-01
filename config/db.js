const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connection successful");
    console.log(`Connected to MySQL on port ${process.env.DB_PORT}`);
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.error(`
Failed to connect to MySQL with these settings:
- HOST: ${process.env.DB_HOST}
- PORT: ${process.env.DB_PORT}
- User: ${process.env.DB_USER}
- Database: ${process.env.DB_NAME}

Please check your Railway MySQL settings.
    `);
    process.exit(1);
  }
}

testConnection();

module.exports = pool;
