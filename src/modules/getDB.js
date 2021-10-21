const fs = require("fs/promises");
const path = require("path");

// Default DB Path
const dbPath = path.join(__dirname, "..", "db", "db.json");

module.exports = async (databasePath = dbPath) => {
    let db = await fs.readFile(databasePath, "utf8");
    db = await JSON.parse(db);
    return db;
}