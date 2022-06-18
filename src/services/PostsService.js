import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getPosts() {
    const res = await api.get("api/posts");
    logger.log(res.data, "sup");

    AppState.posts = res.data.posts;
    AppState.newer = res.data.newer;
    AppState.older = res.data.older;
    AppState.page = res.data.page;
    AppState.totalPages = res.data.totalPages;
  }

  async getPostsByProfile(profileId) {
    const res = await api.get(`api/posts/?creatorId=${profileId}`);
    logger.log(res.data, "supper");
    AppState.posts = res.data.posts;
    AppState.newer = res.data.newer;
    AppState.older = res.data.older;
    AppState.page = res.data.page;

    AppState.totalPages = res.data.posts.totalPages;
  }
  async createPost(postData) {
    const res = await api.post("api/posts", postData);
    logger.log(res.data);
    AppState.posts.push(res.data.posts);
    AppState.page = res.data.page;

  }
  async removePost(id) {
    const res = await api.delete(`api/posts/${id}`);
    logger.log(res.data);
    AppState.posts = AppState.posts.filter((post) => post.id != id);
  }
  async editPost(id, postData) {
    const res = await api.put(`api/posts/${id}`, postData);
    logger.log(res.data.posts);
  }
  async changePage(url) {
    const res = await api.get(url);
    logger.log("changePaged", res.data);
    AppState.posts = res.data.posts;
    AppState.newer = res.data.newer;
    AppState.page = res.data.page;

    AppState.older = res.data.older;
    AppState.totalPages = res.data.totalPages;
  }
  setActive(post) {
    AppState.activePost = post
  }
}
export const postsService = new PostsService();
