<template>
  <div class="container-fluid">
    <div class="row">
      <Ad v-if="ads.length > 0" :ads="ads" />
      <Search />
      <CreatePost />

      <!-- <img :src="`${ads[0].banner}`" alt="asdwdawda"/> -->
    </div>
  </div>
  <div class="container-fluid d-flex flex-column">
    <Ad2 v-if="ads.length > 0" :ads="ads" />
<div class="container-fluid">

  <div class="row">
    
    <Post
        v-for="(post, index) in posts"
        :key="post.id"
        :index="index"
        :post="post"
      />
    </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 text-end d-flex flex-row justify-content-around">
        <button class="btn btn-info py-2 btn-block" @click="changePage(newer)">
          prev
        </button>
      

    
        <p class="text-center">page: {{ page }}</p>
     
   
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
    const route = useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];

        await postsService.getPosts();
        AppState.ads = [];

        await adsService.getAds();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      likes: computed(() => AppState.likes),
      ads: computed(() => AppState.ads),
      async changePage(url) {
        try {
          await postsService.changePage(url);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
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
