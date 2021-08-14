const { StatusCode } = require("status-code-enum");

const Post = require("../models/post");

const getPosts = async (req, res) => {
  try {
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    // const userId = req.user._id;
    // let postQuery = await Post.find({ creator: userId })
    //   .skip(pageSize * (pageIndex - 1))
    //   .limit(pageSize);
    let postQuery = [];
    if (pageSize && pageIndex) {
      postQuery = await Post.find()
        .skip(pageSize * (pageIndex - 1))
        .limit(pageSize);
    } else {
      postQuery = await Post.find({});
    }

    res.send({
      message: "Successfull",
      posts: postQuery,
      totalAmount: await Post.countDocuments(),
    });
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({ errorMessage: error });
  }
};

const getPostById = async (req, res) => {
  try {
    const _id = req.params.id;

    const getPost = await Post.findById(_id);
    if (!getPost) {
      res.status(StatusCode.ClientErrorNotFound).send();
    }
    res.send({ message: "Post Found!", post: getPost });
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({ errorMessage: error });
  }
};

const addPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, creator: req.user._id });
    const url = `${req.protocol}://${req.get("host")}`;
    post.imagePath = `${url}/images/${req.file.filename}`;
    const savedPost = await post.save();
    res
      .status(StatusCode.SuccessCreated)
      .send({ message: "PostAdded", post: savedPost });
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({ errorMessage: error });
  }
};

const deletePostById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    const result = await Post.deleteOne({ _id, creator: userId });
    //If the n value comes greater than 0 that means the document has been deleted!
    if (result.n > 0) {
      res.send({ message: "Post Deleted!" });
    } else {
      res.status(StatusCode.ClientErrorUnauthorized).send();
    }
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({ errorMessage: error });
  }
};

const updatePostById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    const post = req.body;
    let imagePath;
    if (req.file) {
      const url = `${req.protocol}://${req.get("host")}`;
      imagePath = `${url}/images/${req.file.filename}`;
      post.imagePath = imagePath;
    }
    const result = await Post.updateOne({ _id, creator: userId }, post);
    if (result.n > 0) {
      res.send({ message: "Post Updated!", post: post });
    } else {
      res.status(StatusCode.ClientErrorUnauthorized).send();
    }
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({ errorMessage: error });
  }
};
module.exports = {
  getPosts,
  addPost,
  deletePostById,
  updatePostById,
  getPostById,
};
