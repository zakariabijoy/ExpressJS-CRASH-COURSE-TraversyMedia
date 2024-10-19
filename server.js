import express from "express";
import path from "path";
import posts from "./routes/posts.js";

const app = express();

// setup static folder
//app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/posts", posts);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
