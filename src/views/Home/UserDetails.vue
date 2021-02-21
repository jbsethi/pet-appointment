<template>
  <section class="bg-white rounded">
    <div class="py-3 px-5 bg-indigo-50 flex justify-between">
      <div class="flex items-center">
        <div class="mr-2">
          <div class="avatar h-12 w-12 bg-black rounded-full"></div>
        </div>
        <div>
          <p>{{ user.name }}</p>
          <small>
            <a :href="`mailto:${user.email}`">{{ user.email }}</a>
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
              <div v-if="!isDoctor" @click="toggleAddNewUserPet(true)" class="text-xl pt-1 cursor-pointer">&#10010;</div>
            </div>
            <ul v-if="pets.length > 0 && !loadingPatientPets">
              <li @click="selectPet(pet.id)" v-for="pet in pets" :key="pet.id" class="px-3 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900">
                <p class="text-base leading-normal">{{ pet.name }}</p>
              </li>
            </ul>
            <div v-else-if="loadingPatientPets" class="flex justify-center items-center py-8">
              <div class="animate-spin rounded-full border-2 h-6 w-6"></div>
            </div>
            <p v-else class="text-gray-400 pl-3">
              <em>No Pets !</em>
            </p>
          </section>
        </div>
        <div v-if="isDoctor" class="w-3/4 px-2">
          <PetDoctorHistory :loadingPetDoctorHistory="loadingPetDoctorHistory" :selectedPetId="selectedPetId" :selectedPetDetails="selectedPetDetails" @click:addPetRecord="$emit('click:addPetRecord', $event)"/>
        </div>
        <div v-else class="w-3/4 px-2">
          <div class="mb-2">
            <button
              @click="activeTab = 1"
              class="text-xs py-1 px-2 rounded mr-2 border"
              :class="activeTab == 1 ? 'bg-indigo-500 text-white' : 'border-gray-500 text-gray-900 bg-white '"
            >Visit history</button>
            <button
              @click="activeTab = 2"
              class="text-xs py-1 px-2 rounded mr-2 border"
              :class="activeTab == 2 ? 'bg-indigo-500 text-white' : 'border-gray-500 text-gray-900 bg-white'"
            >Pet Doctor history</button>
          </div>
          <PetDoctorHistory v-if="activeTab == 2" :loadingPetDoctorHistory="loadingPetDoctorHistory" :selectedPetId="selectedPetId" :selectedPetDetails="selectedPetDetails" @click:addPetRecord="$emit('click:addPetRecord', $event)"/>
          <PetUserHistory
            v-if="activeTab == 1"
            :loadSelectedPetDetailsHistory="loadSelectedPetDetailsHistory"
            :selectedPetDetails="selectedPetDetails"
            @click:addVisit="$emit('click:addVisit')"
            @updateOrder="$emit('updateOrder', $event)" />
        </div>
      </section>
    </div>
    <Modal :show="createPetUserModal || createNewUserPet" >
     <div slot="header" class="px-5 py-3 border-b border-black">
        <p class="text-xl">Add pet for user</p>
      </div>
      <form class="px-5 py-3">
        <div>
          <label class="text-sm font-semibold">Pet Name</label>
          <input v-model="pet.name" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Name" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Age</label>
          <input v-model="pet.age" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="number" placeholder="Age" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Color</label>
          <input v-model="pet.color" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Color" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Pet</label>
          <input v-model="pet.pet" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Cat, Dog etc"/>
        </div>
        <div class="mt-12 flex justify-between">
          <div>
            <button @click="confirmCreateUserPet()" type="button" class="px-3 py-1 bg-indigo-500 text-white rounded shadow">Confirm</button>
            <button @click="resetUserPetData()" type="button" class="ml-1 px-5 py-1 bg-gray-500 text-white rounded shadow">Clear</button>
          </div>
          <div>
            <button @click="cancelCreateUserPet(false)" type="button" class="ml-1 px-5 py-1 bg-red-500 text-white rounded shadow">Close</button>
          </div>
        </div>
      </form>
    </Modal>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import PetDoctorHistory from './PetDoctorHistory.vue'
import PetUserHistory from './PetUserHistory.vue'
export default {
  name: 'UserDetails',
  props: {
    createNewUserPet: {
      type: Boolean,
      default: false
    },
    loadingPetDoctorHistory: {
      type: Boolean,
      default: false
    },
    loadSelectedPetDetailsHistory: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    },
    selectedPetId: {
      type: [String, Number]
    },
    selectedPetDetails: {
      type: Object
    }
  },
  data () {
    return {
      loadingPatientPets: false,
      pets: [],
      activeTab: 1,

      createPetUserModal: false,
      pet: {
        name: '',
        color: '',
        age: '',
        pet: ''
      },
    }
  },
  methods: {
    selectPet (petId) {
      this.$emit('click:selectPet', petId)
    },

    toggleAddNewUserPet (status) {
      this.createPetUserModal = status == undefined ? !this.createPetUserModal : status
    },

    confirmCreateUserPet () {
      const data = {
        pet: { ...this.pet }
      }

      data.pet.patientId = this.user.id

      this.createPatientPet(data)
        .then(resp => {
          this.pets.push({ ...resp.data })
          this.cancelCreateUserPet()

          if (this.createNewUserPet) {
            this.$emit('handle:createNewUserPet', 'confirm')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    cancelCreateUserPet () {
      this.toggleAddNewUserPet(false)
      this.resetUserPetData()

      if (this.createNewUserPet) {
        this.$emit('handle:createNewUserPet', 'close')
      }
    },

    resetUserPetData () {
      this.pet.name = ''
      this.pet.color = ''
      this.pet.age = ''
      this.pet.pet = ''
    },

    ...mapActions([
      'loadPatientPets',
      'createPatientPet'
    ])
  },
  components: {
    Modal,
    PetDoctorHistory,
    PetUserHistory
  },
  computed: {
    ...mapState({
      isDoctor: state => (state.currentRole == 'doctor'),
      isReceiptionist: state => (state.currentRole == 'receiptionist')
    })
  },
  watch: {
    'user.id': {
      immediate: true,
      deep: true,
      handler () {
        this.loadingPatientPets = true
        const data = {
          patientId: this.user.id
        }

        this.loadPatientPets(data)
          .then(resp => {
            this.pets = resp.data.rows
            this.loadingPatientPets = false
          })
          .catch(err => {
            console.log(err)
            this.loadingPatientPets = false
          })
      }
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