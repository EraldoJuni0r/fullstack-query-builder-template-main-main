export default {
    client: "sqlite3",
    connection: {
        filename: "./src/database/database.db",
    },
    userNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./src/database/migrations",
    },
}