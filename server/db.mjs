import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getPosts = () => db.any("SELECT * FROM posts");

export const getPost = (id) =>
  db.one(`SELECT * FROM posts WHERE id = ${id}`, { id });

export const getComments = (post_id) =>
  db.any(`SELECT * FROM comments WHERE post_id = ${post_id}`, { post_id });

export const addPost = (post) =>
  db.one(
    "INSERT INTO posts(title, blurb, body, author) VALUES(${title}, ${blurb}, ${body}, ${author}) RETURNING *",
    post,
  );

export const addComment = (comment) =>
  db.one(
    "INSERT INTO comments(content, author, post_id) VALUES($1, $2, $3) RETURNING *",
    [comment.content, comment.author, comment.id],
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
