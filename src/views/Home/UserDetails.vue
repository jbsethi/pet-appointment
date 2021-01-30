<template>
  <section class="bg-white rounded">
    <div class="py-3 px-5 bg-indigo-50 flex justify-between">
      <div class="flex items-center">
        <div class="mr-2">
          <div class="avatar h-12 w-12 bg-black rounded-full"></div>
        </div>
        <div>
          <p>Jahanzeb Ahmed</p>
          <small>
            <a href="mailto:jahanzebsethi@gmail.com">jahanzebsethi@gmail.com</a>
          </small>
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
              <div v-if="!isDoctor" @click="$emit('click:addPet')" class="text-xl pt-1 cursor-pointer">&#10010;</div>
            </div>
            <ul>
              <li @click="selectPet(pet.id)" v-for="pet in pets" :key="pet.id" class="px-3 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900">
                <p class="text-base leading-normal">{{ pet.name }}</p>
              </li>
            </ul>
          </section>
        </div>
        <div class="w-3/4 px-2">
          <PetDoctorHistory v-if="isDoctor" :selectedPetId="selectedPetId" :selectedPetDetails="selectedPetDetails" @click:addPetRecord="$emit('click:addPetRecord', $event)"/>
          <PetUserHistory v-else @click:addVisit="$emit('click:addVisit')" />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PetDoctorHistory from './PetDoctorHistory.vue'
import PetUserHistory from './PetUserHistory.vue'
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
  },
  methods: {
    selectPet (petId) {
      if (this.isDoctor) {
        this.$emit('click:selectPet', petId)
      }
    }
  },
  components: {
    PetDoctorHistory,
    PetUserHistory
  },
  computed: {
    ...mapState({
      isDoctor: state => (state.currentRole == 'doctor'),
      isReceiptionist: state => (state.currentRole == 'receiptionist')
    })
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  height: 67vh;
  overflow: auto;
}
</style>