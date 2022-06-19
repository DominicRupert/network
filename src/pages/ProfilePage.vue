<template>
 
  <div class="container-fluid">
    <div class="row justify-content-center profile">
      <div
        class="
          col-4
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img class="profile-img" :src="profile.picture" alt="" />
        <div class="col-12 text-center">
         <h1>
           {{ profile.name }}

         </h1> 
         <h3>{{profile.bio}}</h3>
       <div>

         <Modal
        v-if="profile.id == account.id"
        :id="'edit-profile' + profile.id"
      >
        <template #header
          >Edit {{profile.name}}'s Profile</template
        >
        <template #body> <ProfileForm :editProfile="profile" /></template>
        <template #button>
          <button
            type="button"
            class="btn btn-warning edit-button position-absolute"
            data-bs-toggle="modal"
            :data-bs-target="'#edit-profile' + profile.id"
          >
            <i class="mdi mdi-pencil"></i>
          </button>
        </template>
      </Modal>
          </div>
        </div>
      </div>
    </div>

          <div class="row">
      <h5><span class="mdi mdi-github"></span> {{ profile.github }}</h5>
      <h5><span class="mdi mdi-linkedin"></span> {{ profile.linkedin }}</h5>
      <h5>{{ profile.resume }}</h5>
      <h5>Have They Gradutated yet? {{ profile.graduated }}</h5>
    </div>
    <div class="row">
      <CreatePost v-if="account.id == profile.id" />
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  

  setup() {
   

  
    const route = useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];
        await profilesService.getProfile(route.params.id);
        await postsService.getPostsByProfile(route.params.id);
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
     
        profile: computed(() => AppState.profile),
     
      
     
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
.bg-img {
  height: 20vh;
  background-size: cover;
  background-position: center;
  background-color: var(--bs-primary);
}
.profile {
}
.profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>
