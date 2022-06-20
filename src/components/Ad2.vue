<template>
  <div class="row">
    <div class="col-3 d-flex">

        <img class="img-fluid" :src="`${ads[1].tall}`" alt="asdwdawda"/>
    </div>
   
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { adsService } from "../services/AdsService.js";

export default {
  props: {
    ads: { type: Object, required: false },
    src: { type: String, required: false }
  },
  setup(props) {
    const adData = ref({});
    logger.log(props.ads,'ohiyo');
    return {
      ad: computed(() => AppState.ads),
      adData,

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
  },
};
</script>