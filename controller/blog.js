const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).send({ error: "Solicitud Incorrecta" });
  }
  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0,
  };

  const blog = new Blog(newBlog);

  const blogCreated = await blog.save();
  response.status(200).json({ blog: blogCreated });
});

blogRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;
  const blog = {
    likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json({
    blog: updatedBlog,
  });
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
