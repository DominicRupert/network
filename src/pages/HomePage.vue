<template>
  <div class="container-fluid">
    <div class="row">
      <Search/>
      <CreatePost/>

    </div>
  </div>
  <div class="container-fluid d-flex flex-column">
    <div class="row justify-content-center">
      <Ad v-for="ad in ads" :key="ad.banner" :ad="ad"/>
      <Ad v-for="ad in ads" :key="ad.tall" :ad="ad"/>
      <Post v-for="post in posts" :key="post.id" :post="post" />
      <div class="col-3 text-end">
        <button
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(newer)"
        >
          prev
        </button>
      </div>
      <p class="col-3 text-center">page: {{ page }}</p>
      <div class="col-3 text-start">
        <button
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(older)"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import { computed, onMounted, watchEffect } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import { useRoute } from "vue-router";
import { adsService } from "../services/AdsService.js";
export default {
  name: "Home",

  setup() {
    const route=useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];
        await postsService.getPosts();
        
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
      try {
        AppState.posts = [];
        await postsService.getPosts();
        
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    

    return {
      async changePage(url) {
        try {
          await postsService.changePage(url);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      async getAds() {
            try {
              AppState.posts = [];
              await adsService.getAds();
                logger.log("getting ad", ad.value);
            } catch (error) {
                Pop.toast(error.message, "error");
                logger.error(error);
            }
        },
      
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      likes: computed(() => AppState.likes),
      ads: computed(() => AppState.ads),
      
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
