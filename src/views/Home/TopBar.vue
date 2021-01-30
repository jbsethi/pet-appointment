<template>
  <section class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl">Users</h1>
    </div>
    <div v-if="!isDoctor">
      <button @click="$emit('click:addNewUser')" class="px-5 py-3 bg-indigo-600 text-white rounded">
        <span>Create New User</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TopBar',
  computed: {
    ...mapState({
      isDoctor: state => (state.currentRole == 'doctor')
    })
  }
}
</script>