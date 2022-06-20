import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService{
  async getProfile(id, profileData) {
    const res = await api.get('api/profiles/' + id)
    logger.log('profile get', res.data)
    AppState.profile = res.data
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
  
}

export const profilesService = new ProfilesService()
