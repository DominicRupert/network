<template>
  <div class="container-fluid">
    <div class="row">
      <CreatePost />

      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
      <div class="row justify-content-center">
      <div class="col-3 text-end">
        <button
          :disabled="page <= 1"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(pageNumber - 1)"
        >
          prev
        </button>
      </div>
      <p class="col-3 text-center">
        page {{ page }} {{ totalPages }}
      </p>
      <div class="col-3 text-start">
        <button
          :disabled="page >= totalPages"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(pageNumber + 1)"
        >
          next
        </button>
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
      totalPages: computed(() => AppState.totalPages),
         async changePage(pageNumber) {
        try {
          await postsService.changePage(pageNumber);
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
