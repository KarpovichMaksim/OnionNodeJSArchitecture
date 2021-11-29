const CrudController = require("../crud/crud.controller");

class PostsController extends CrudController {
  constructor(postsService, cacheService) {
    super(postsService);

    this.cacheService = cacheService;

    this.readAll = this.readAll.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);

    this.routes["/"] = [{ method: "get", cb: this.readAll }];
    this.routes["/upvote"] = [{ method: "post", cb: this.upVote }];
    this.routes["/downvote"] = [{ method: "post", cb: this.downVote }];

    this.registerRoutes();
  }

  async readAll(req, res) {
    const posts = await this.service.readChunk(req.params);

    this.cacheService.set(req, posts);

    res.json(posts);
  }

  async upVote(req, res) {
    await this.service.upVote(req.body.id);

    res.json({ success: true });
  }

  async downVote(req, res) {
    await this.service.downVote(req.body.id);

    res.json({ success: true });
  }
}

module.exports = (postsService, cacheService) => {
  const controller = new PostsController(postsService, cacheService);

  return controller.router;
};
