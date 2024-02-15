
const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/books/", async (request, response) => {
    const bookDetails = request.body;
    const {
      Id,
      SKU_name,
    } = bookDetails;
    const addBookQuery = `
      INSERT INTO
        book (Id,SKU_name)
      VALUES
        (562361, dairy milk), (456554, chocolate), (456231, biscuit), (456523, five star), (878956, vennela);`;
  
    const dbResponse = await db.run(addBookQuery);
    console.log(dbResponse)
    const bookId = dbResponse.lastID;
    response.send({ bookId: bookId });
    console.log("1")
    console.log(bookId)
  });