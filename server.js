const express = require("express");
const path = require("path");

const app = express();

// setup static folder
//app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];

//Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

//Get single post
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
