import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class AdsService {
    async getAds() {
        const res = await api.get("api/ads");
        logger.log(res.data, "sup");
     
        AppState.ads = res.data.ads;
    }
}


export const adsService = new AdsService();