<!-- <template>

  <div class="col-md-6 p-0 selectable" @click="setActive">
    <div class="row border border-light p-0 project">
      <div
        class="
          col-6
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <p>{{ post.title }}</p>
        <p class="profile m-0 selectable p-1 rounded" @click.stop="goToProfile">
          <img
            class="profile-img me-2"
            :src="post.creator.picture"
            alt=""
          />{{ post.creator.name }}
        </p>
      </div>
    </div>
 
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      setActive() {
        projectsService.setActive(props.post);
        Modal.getOrCreateInstance(
          document.getElementById("post-modal")
        ).show();
      },
      goToProfile() {
        router.push({
          name: "Profile",
          params: { id: props.project.creatorId },
        });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.profile {
  position: absolute;
  bottom: 2px;
  right: 5px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 45px;
  object-fit: cover;
}

.project {
  margin: 0.25em;
  transition: all 0.1s ease;
  div {
    position: relative;
  }
  &:hover {
    transform: scale(1.01) translateY(-5px);
    border: solid 3px var(--bs-light);
  }
  & > img {
    height: 10em;
    object-fit: cover;
  }
}
</style> -->
