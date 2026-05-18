const path = require("path");
const fs = require("fs");

// Load better-sqlite3 from explicit path since standalone node_modules is minimal
const Database = require(path.join(process.cwd(), "node_modules", "better-sqlite3"));

const raw = process.env.DATABASE_URL ?? "file:./dev.db";
const stripped = raw.startsWith("file:") ? raw.slice(5) : raw;
const dbPath = path.isAbsolute(stripped)
  ? stripped
  : path.resolve(process.cwd(), stripped);

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

console.log("[startup] Opening database:", dbPath);
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

const migrationsDir = path.join(__dirname, "..", "prisma", "migrations");
const folders = fs
  .readdirSync(migrationsDir)
  .filter((f) => f !== "migration_lock.toml" && fs.statSync(path.join(migrationsDir, f)).isDirectory())
  .sort();

for (const folder of folders) {
  const sqlFile = path.join(migrationsDir, folder, "migration.sql");
  if (!fs.existsSync(sqlFile)) continue;
  const sql = fs.readFileSync(sqlFile, "utf-8");
  try {
    db.exec(sql);
    console.log("[startup] Applied:", folder);
  } catch (e) {
    if (e.message && e.message.includes("already exists")) {
      console.log("[startup] Skipped (exists):", folder);
    } else {
      console.error("[startup] ERROR:", e.message);
      process.exit(1);
    }
  }
}

db.close();
console.log("[startup] Database ready.");
