<template>
    <div class="row">
<img :src="ad.banner" alt="">
        

</div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { adsService } from "../services/AdsService.js";

export default{
setup(){
    const ad = ref({});
    return {
        ad: computed(() => AppState.ads),
        ad,
        async getAds() {
            try {
                logger.log("getting ad", ad.value);
                await adsService.getAds();
            } catch (error) {
                Pop.toast(error.message, "error");
                logger.error(error);
            }
        },
    };
    }
}








</script>