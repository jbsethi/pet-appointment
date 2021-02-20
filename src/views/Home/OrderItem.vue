<template>
  <article
    class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
  >
    <p class="text-sm">Description: {{ history.description }}</p>
    <p class="text-sm">Price: {{ history.price }}</p>
    <small class="text-xs">{{ getFormatedDate(history.createdAt) }}</small>
    <div>
      <button @click="showInvoice" class="w-full text-xs cursor-pointer">Show Invoice</button>
    </div>
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
    showInvoice () {
      window.open(`/invoices/${this.history.id}`, 'chart', 'width=720, height=700')
    },
    getServiceName (id) {
      return serviceMap[id]
    },
    getFormatedDate (date) {
      const temp = new Date(date)
      return `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>