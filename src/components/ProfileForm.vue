<template>
        <form class="d-flex flex-column" action="" >
    <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
          <label for="">account name</label>
          <input  class="form-control" type="text" v-model="profileData.name" />
          <label for="">bio</label>
          <input  class="form-control" type="text" v-model="profileData.bio" />
          <label for="">class</label>
          <input  class="form-control" type="text" v-model="profileData.class" />
          <label for="">account name</label>
          <input class="form-control"  type="text" v-model="profileData.linkedin" />
          <label for="">account name</label>
          <input class="form-control" type="text" v-model="profileData.github" />
          <label for="">account picture</label>
          <input type="text" v-model="profileData.picture" />
          <label for="">account cover image</label>
          <div>

              <button v-if="profileData.id" @click.prevent="editProfile" class="btn btn-primary" >
      Edit Profile
    </button>
          </div>

        
        </div>
      </div>
    </div>
  </form>
</template>





<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { watchEffect, ref } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  name: "Profile",
  props: { editProfile: { type: Object, required: true, default: {} } },

  setup(props) {
    const profileData = ref({});

    watchEffect(() => {
        if (props.editProfile) {
            profileData.value = props.editProfile;
        }
      logger.log(props.editProfile);
      profileData.value = {...AppState.account, ...props.editProfile};
    });


    return {
      profileData,
      async editProfile() {
        try {
          logger.log(profileData.value);
          await profilesService.editProfile(profileData.value);
          profileData.value = {}
          Modal.getOrCreateInstance(
            document.getElementById("edit-profile" + profileData.value.id)
          ).hide();
          Pop.toast("edited profile", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
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
