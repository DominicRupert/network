<template>
  <form class="d-flex flex-column row" action="" @submit.prevent="saveAccount">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded img-fluid"  :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <label for="">account name</label>
          <input class="form-control" type="text" v-model="editable.name" />
          <label for="">bio</label>
          <input class="form-control" type="text" v-model="editable.bio" />
          <label for="">class</label>
          <input class="form-control" type="text" v-model="editable.class" />
          <label for="">LinkedIn url</label>
          <input
            class="form-control"
            type="text"
            v-model="editable.linkedin"
          />
          <label for="">github</label>
          <input
            class="form-control"
            type="text"
            v-model="editable.github"
          />
          <label for="">account picture</label>
          <input type="text" class="form-control" v-model="editable.picture" />
          
          <div>
            <button 
              
              
              class="btn btn-primary p-3 mt-2"
            >
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
import { computed, reactive, onMounted, watchEffect, ref} from "vue";

import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";
import { accountService } from "../services/AccountService.js";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  


  setup() {
    const route = useRoute();
    const profileData = ref({});
    const accountData = ref({});
    const editable = ref({});
    watchEffect(() => {
  AppState.account
       logger.log("account updated", AppState.account, editable.value);
      editable.value = { ...AppState.account };
      
    });

    return {
        editable,
          accountData,
        profileData,
      account: computed(() => AppState.account),
      async saveAccount() {
        try {
          await accountService.editAccount(editable.value);
         Pop.toast("Updated Account", "success");
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
