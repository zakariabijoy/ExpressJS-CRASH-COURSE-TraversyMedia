import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = process.env.PORT || 8000;

//Get the dirname of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

//config ejs
app.set("view engine", "ejs");
app.set("views", "views");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//logger middleware
app.use(logger);

//Routes
app.use("/api/posts", posts);

// server side view rendering
app.get("/view", (req, res) => {
  res.render("index", {
    title: "Welcome to my Blog",
    message: "Hello from EJS",
    people: ["John", "Mary", "Bob"],
  });
});

//error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
