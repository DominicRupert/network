<template>
  <!-- Button trigger modal -->
  <slot name="button">
    <!--  -->
  
    <!--  -->
  </slot>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog dialog-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header">
              <!--  -->
              <!--  -->
            </slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            <!--  -->
            something here is a default
            <!--  -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import { Modal } from "bootstrap";
export default {
  props: { id: { type: String } },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>
