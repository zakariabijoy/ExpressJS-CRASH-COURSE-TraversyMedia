// in memory data store for posts
let posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];

// @desc Get all post
// @route GET /api/posts
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get Single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc Create new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const { title, content } = req.body;
  const id = posts.length + 1;
  const newPost = { id, title, content };

  if (!title || !content) {
    const error = new Error("Please provide title and content");
    error.status = 404;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(newPost);
};

// @desc update  post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  const { title, content } = req.body;

  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }
  res.status(200).json(post);
};

// @desc delete  post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  const index = posts.indexOf(post);
  posts.splice(index, 1);

  res.status(200).json({ message: "Post deleted successfully" });
};
