import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService{
  async getProfile(id, profileData) {
    const res = await api.get('api/profiles/' + id, profileData)
    logger.log('profile get', res.data)
    AppState.profile = res.data
  }
  async editProfile(profileData) {
    const res = await api.put('api/profiles/'+ profileData.id, profileData)
    logger.log(res.data);
   
  }
}

export const profilesService = new ProfilesService()
