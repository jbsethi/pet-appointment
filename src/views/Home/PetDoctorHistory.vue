<template>
  <section class="border border-black">
    <div class="flex items-start justify-between p-3 bg-indigo-50">
      <p class="text-xl font-medium">History</p>
      <button
        @click="$emit('click:addPetRecord', selectedPetId)"
        v-if="selectedPetId && isDoctor"
        class="h-9 px-3 bg-indigo-600 text-white rounded flex items-center justify-center leading-none"
      >
        Add Record
      </button>
    </div>
    <section
      v-if="selectedPetId && selectedPetDetails.history.length > 0 && !loadingPetDoctorHistory"
      class="p-3 flex flex-col gap-y-2 history-container"
    >
      <article
        v-for="history in selectedPetDetails.history"
        :key="history.id"
        class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
      >
        <p class="text-sm">Statement: {{ history.statement }}</p>
        <p class="text-sm">Prescription: {{ history.prescription }}</p>
        <p class="text-sm">Description: {{ history.description }}</p>
        <small class="text-xs">{{ history.createdAt }}</small>
      </article>
    </section>
    <section v-else-if="selectedPetDetails.history.length == 0 && !loadingPetDoctorHistory" class="p-3 flex flex-col gap-y-2 history-container">
      <p class="text-center py-5">
        <em>No history</em>
      </p>
    </section>
    <section v-else-if="loadingPetDoctorHistory" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full border-4 h-16 w-16"></div>
    </section>
    <section v-else class="p-3 flex flex-col gap-y-2 history-container">
      <p class="text-center py-5">
        <em>Please Select Pet</em>
      </p>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "PetDoctorHistory",
  props: {
    loadingPetDoctorHistory: {
      type: Boolean,
      default: false
    },
    selectedPetId: {
      type: [String, Number],
    },
    selectedPetDetails: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      isDoctor: state => (state.currentRole == 'doctor'),
    })
  },
};
</script>

<style lang="scss" scoped></style>
