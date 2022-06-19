<template >
  <div class="col-6 card bg-dark border border-3">
    <h1>
      {{ post.body }}
    </h1>
    <button
      v-show="post.creatorId == account.id"
      class="delete-button btn btn-danger rounded-pill content selectable"
      @click="removePost"
    >
      <i class="mdi mdi-delete-forever"></i>
    </button>
    <button
      class="mdi mdi-thumb-up btn btn-success rounded-pill content selectable"
    ></button>

    <div>
      <!-- dig into github -->

      <img class="img-fluid" :src="post.imgUrl" alt="" />
      <p class="mb-0">{{ formatDate(post.createdAt) }}</p>
      <p class="profile m-0 selectable p-1 rounded" @click.stop="goToProfile">
        <img class="profile-img me-2" :src="post.creator.picture" alt="" />{{
          post.creator.name
        }}
      </p>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import CreatePost from "./CreatePost.vue";
export default {
  props: { post: { type: Object, reqiured: true } },
  setup(props) {
    const router = useRouter();
    return {
      goToProfile() {
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      formatDate(rawDate) {
        return new Date(rawDate).toDateString();
      },
      account: computed(() => AppState.account),
      async removePost() {
        try {
          await postsService.removePost(props.post.id);
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
  components: { CreatePost },
};
</script>


<style lang="scss" scoped>
.delete-button {
  position: absolute;
  top: 0.25em;
  right: 0.25em;
  width: 40px;
  height: 40px;
  border-radius: 50em;
  background: var(--bs-danger);
  color: var(--bs-light);
  border: 0;
}

.img-fluid {
  max-width: 40vw;
  height: auto;
}
.profile {
  bottom: 2px;
  right: 5px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 45px;
  object-fit: cover;
}
</style>