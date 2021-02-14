<template>
  <section class="flex justify-between items-center px-5 py-4 bg-white rounded">
    <div class="flex items-center">
      <div class="mr-2">
        <div class="avatar h-12 w-12 bg-black rounded-full"></div>
      </div>
      <div>
        <p>{{ user.name }}</p>
        <small v-if="user.activity">last: {{ user.activity }}</small>
      </div>
    </div>
    <div>
      {{ getDate(user.createdAt) }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchedUser',
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    getDate (date) {
      const fullDate = new Date()
      return `${fullDate.getDate()}/${+fullDate.getMonth() + 1}/${fullDate.getFullYear()}`
    }
  }
}
</script>