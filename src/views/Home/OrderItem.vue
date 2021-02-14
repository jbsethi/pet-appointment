<template>
  <article
    class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
  >
    <p class="text-sm">Visit type: {{ getServiceName(history.serviceId) }}</p>
    <p class="text-sm">Price: {{ history.price }}</p>
    <small class="text-xs">{{ history.createdAt }}</small>
  </article>
</template>

<script>
const serviceMap = {
  1: 'Shopping',
  2: 'Grooming',
  3: 'Doctor'
}
export default {
  props: {
    history: {
      type: Object
    }
  },
  methods: {
    getServiceName (id) {
      return serviceMap[id]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>