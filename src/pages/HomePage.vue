<template>
  <div class="container-fluid">
    <div class="row">
      <CreatePost />

      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center">
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
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";

export default {
  name: "Home",

  setup() {
    onMounted(async () => {
      try {
        AppState.posts = [];
        await postsService.getPosts();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.Account),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
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
