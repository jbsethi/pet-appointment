<template>
  <section class="border border-black">
    <div class="flex items-start justify-between p-3 bg-indigo-50">
      <p class="text-xl font-medium">History</p>
      <button
        @click="$emit('click:addPetRecord', selectedPetId)"
        v-if="selectedPetId"
        class="h-9 px-3 bg-indigo-600 text-white rounded flex items-center justify-center leading-none"
      >
        Add Record
      </button>
    </div>
    <section
      v-if="selectedPetId"
      class="p-3 flex flex-col gap-y-2 history-container"
    >
      <article
        v-for="history in selectedPetDetails.history"
        :key="history.id"
        class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
      >
        <p class="text-sm">Statement: {{ history.statement }}</p>
        <p class="text-sm">Treatment: {{ history.treatment }}</p>
        <p class="text-sm">Description: {{ history.description }}</p>
        <small class="text-xs">{{ history.date }}</small>
      </article>
    </section>
    <section v-else class="p-3 flex flex-col gap-y-2 history-container">
      <p class="text-center py-5">
        <em>Please Select Pet</em>
      </p>
    </section>
  </section>
</template>

<script>
export default {
  name: "PetDoctorHistory",
  props: {
    selectedPetId: {
      type: [String, Number],
    },
    selectedPetDetails: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
