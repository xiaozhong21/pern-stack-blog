import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getPosts = () => db.any("SELECT * FROM posts");

export const getPost = (id) =>
  db.one(`SELECT * FROM posts WHERE id = ${id}`, { id });

export const addTask = (name) =>
  db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });

export const addPost = (post) =>
  db.one(
    "INSERT INTO posts(title, blurb, body, author) VALUES(${title}, ${blurb}, ${body}, ${author}) RETURNING *",
    post,
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
