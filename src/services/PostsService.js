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
    const res = await api.post("api/posts/", postData);
    logger.log(res.data);
    
    AppState.posts.push(res.data.posts);
  }
  async removePost(id) {
    const res = await api.delete(`api/posts/${id}`);
    logger.log(res.data);
    AppState.posts = AppState.posts.filter((post) => post.id != id);
  }
  // async likePost(postData,likePost,id,postId,post) {
  //   const res = await api.post(`api/posts/${post.id}/likes/`, postData+id, postData)
  //     AppState.likes = res.data.likes
  //     AppState.posts = res.data.posts;

  // }
  async likePost(likeData, likeIds, likes, postData, id) {
    const res = await api.post(`api/posts/posts/${post.id}/likes/`, id);
    logger.log(res.data);

    AppState.likes.push(res.data.posts.likes);
    AppState.likes = res.data.likes;
  
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
  async searchPosts(query = "") {
    AppState.query = query;
    logger.log("searching", query);
    const res = await api.get(`api/posts?${query}`);
    logger.log("searchposts-", res.data);
    AppState.posts = res.data.posts;
    AppState.newer = res.data.newer;
    AppState.page = res.data.page;

    AppState.older = res.data.older;
    AppState.totalPages = res.data.totalPages;
  }
  setActive(post) {
    AppState.activePost = post;
  }
}
export const postsService = new PostsService();
