<template>
<div class="container-fluid">
  
  <div class="row">
    <form
      class="pb-4 d-flex flex-column bg-dark"
      action=""
      @submit.prevent="createPost"
    >
      <h1>Create a post</h1>
      <input type="text" placeholder=" title" v-model="postData.body" />

      <input type="text" placeholder=" image url" v-model="postData.imgUrl" />
      <button class="btn btn-primary">create</button>
    </form>
    
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, onBeforeUnmount, ref } from "vue";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/postsService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const postData = ref({})
    return {
      postData,
          account: computed(() => AppState.account),
  profile: computed(() => AppState.profile),
  posts: computed(() => AppState.posts),
  likes: computed(() => AppState.likes),
      async createPost() {
        try {
          await postsService.createPost(postData.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>