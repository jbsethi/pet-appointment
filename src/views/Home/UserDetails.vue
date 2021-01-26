<template>
  <section class="bg-white rounded">
    <div class="py-3 px-5 bg-indigo-50 flex justify-between">
      <div class="flex items-center">
        <div class="mr-2">
          <div class="avatar h-12 w-12 bg-black rounded-full"></div>
        </div>
        <div>
          <p>Jahanzeb Ahmed</p>
          <small>last: shopped toys</small>
        </div>
      </div>
      <div @click="$emit('click:close')" class="cursor-pointer" >
        &#10005;
      </div>
    </div>

    <div class="bg-white p-4">
      <section class="flex">
        <div class="w-1/4">
          <section>
            <div class="p-3 mb-3 flex justify-between items-center">
              <p class="text-xl font-medium ">Pets</p>
              <div @click="$emit('click:addPet')" class="text-xl pt-1 cursor-pointer">&#10010;</div>
            </div>
            <ul>
              <li @click="$emit('click:selectPet', pet.id)" v-for="pet in pets" :key="pet.id" class="px-3 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900">
                <p class="text-base leading-normal">{{ pet.name }}</p>
              </li>
            </ul>
          </section>
        </div>
        <div class="w-3/4 px-2">
          <section class="border border-black">
            <div class="flex items-start justify-between p-3 bg-indigo-50">
              <p class="text-xl font-medium">History</p>
              <button @click="$emit('click:addPetRecord', selectedPetId)" v-if="selectedPetId" class="h-9 px-3 bg-indigo-600 text-white rounded flex items-center justify-center leading-none">
                Add Record
              </button>
            </div>
            <section v-if="selectedPetId" class="p-3 flex flex-col gap-y-2 history-container">
              <article v-for="history in selectedPetDetails.history" :key="history.id" class="w-full border border-indigo-100 bg-indigo-100 rounded p-2">
                <p class="text-sm">Statement: {{ history.statement }}</p>
                <p class="text-sm">Treatment: {{ history.treatment }}</p>
                <p class="text-sm">Description: {{ history.description }}</p>
                <small  class="text-xs">{{ history.date }}</small>
              </article>
            </section>
            <section v-else class="p-3 flex flex-col gap-y-2 history-container">
              <p class="text-center py-5">
                <em>Please Select Pet</em>
              </p>
            </section>
          </section>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    pets: {
      type: Array,
      default: () => []
    },
    selectedPetId: {
      type: [String, Number]
    },
    selectedPetDetails: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  height: 67vh;
  overflow: auto;
}
</style>