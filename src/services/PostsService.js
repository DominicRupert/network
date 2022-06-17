import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getPosts() {
    const res = await api.get("api/posts");
    logger.log(res.data, "sup");

    AppState.posts = res.data.posts;
    
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
  }

  
  async getPostsByProfile(profileId) {
      const res = await api.get(`api/posts/?creatorId=${profileId}`);
      logger.log(res.data, "supper");
      AppState.posts = res.data.posts;
      
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
    }
    async createPost(postData) {
      const res = await api.post("api/posts", postData);
      logger.log(res.data);
  
      AppState.posts.push(res.data.posts);
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
  async changePage(pageNumber){
    
    const res = await api.get(`api/posts?&page=${pageNumber}`)
    logger.log('-changePage-', res.data)
    AppState.posts = res.data.posts
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
  }
}
export const postsService = new PostsService();
