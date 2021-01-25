<template>
  <div class="dashboard w-full">
    <AppLeftBar />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AppLeftBar from '../components/AppLeftBar/index.vue'
export default {
  name: 'DashboardLayout',
  components: {
    AppLeftBar
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 290px;
}
</style>
