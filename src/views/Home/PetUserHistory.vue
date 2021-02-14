<template>
  <section class="border border-black">
    <div class="flex items-start justify-between p-3 bg-indigo-50">
      <p class="text-xl font-medium">User logs</p>
      <button
        @click="$emit('click:addVisit')"
        class="h-9 px-3 bg-indigo-600 text-white rounded flex items-center justify-center leading-none"
      >
        Add visit
      </button>
    </div>
    <section
      v-if="selectedPetDetails.history.length > 0"
      class="p-3 flex flex-col gap-y-2 history-container"
    >
      <OrderItem
        v-for="history in selectedPetDetails.history"
        :key="history.id"
        :history="history"
        class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
      ></OrderItem>
    </section>
    <section v-else>
      <p class="py-5 text-center text-gray-400">
        <em>No History Found !</em>
      </p>
    </section>
  </section>
</template>

<script>
import OrderItem from './OrderItem.vue'
export default {
  name: "PetUserHistory",
  props: {
    selectedPetDetails: {
      type: Object,
      default: () => {}
    }
  },
  // data () {
  //   return {
  //     userHistory: [
  //       {
  //         id: '1',
  //         type: 'shopping',
  //         date: '20-1-2021'
  //       },
  //       {
  //         id: '2',
  //         type: 'doctor',
  //         petNames: ['Tom'],
  //         date: '20-1-2021'
  //       },
  //       {
  //         id: '3',
  //         type: 'grooming',
  //         petNames: ['Tom'],
  //         date: '20-1-2021'
  //       }
  //     ]
  //   }
  // },
  components: {
    OrderItem
  }
};
</script>

<style lang="scss" scoped>
.history-container {
  max-height: 60vh;
  overflow: auto;
}
</style>
