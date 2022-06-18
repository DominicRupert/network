<template>
    <!-- <div class="row "> -->
        <form class="  pb-4 d-flex flex-column bg-dark" action="" @submit.prevent="createPost">
            <h1>Create a post</h1>
            <input type="text" placeholder=" title" v-model="postData.title" />
            <input type="text" placeholder=" image url" v-model="postData.imgUrl" />
            <textarea name="" id="" cols="30" rows="4" placeholder=" Post description" v-model="postData.body"></textarea>
            <button class="btn btn-primary">create</button>
        </form>
    <!-- </div> -->
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
            async createPost() {
                try {
                    await postsService.createPost(postData.value)

                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>