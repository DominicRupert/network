<template>
  <header>
    <Navbar />
  </header>
  <main class=" bg-dark">
    <router-view />
  </main>
  <Modal id="">
    <template #header> post details </template>
    <template #body>
      <ActivePost />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
