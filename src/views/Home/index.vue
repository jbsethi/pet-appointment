<template>
<DashboardLayout>
  <section class="flex justify-around pt-14 bg-gray-200 min-h-screen">
    <section :class="activeUserId ? 'w-4/12' : 'w-11/12'">
      <TopBar @click:addNewUser="toggleAddNewUser()"/>
      <SearchBar @enter:searchUser="searchUser"/>
      <div
        v-if="users.length > 0 && (!patientLoading && !searchLoading)"
        class="searched-users mt-5"
        :class="activeUserId ? 'flex flex-col gap-3' : 'grid grid-cols-3 gap-4'"
      >
        <SearchedUser
          class="cursor-pointer hover:bg-gray-50"
          v-for="user in users"
          :key="user.id"
          :user="user"
          :class="activeUserId ? '' : 'user-fit-content'"
          @click="selectActiveUser(user)"
        />
      </div>
      <div v-else-if="patientLoading || searchLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full border-4 h-16 w-16"></div>
      </div>
      <div v-else class="searched-users mt-5">
        <p class="text-center mt-5 py-3 text-2xl text-gray-400"><em>No User Exist !</em></p>
      </div>
    </section>
    <section v-if="activeUserId" class="w-7/12">
      <UserDetails
        :user="activeUser"
        :selectedPetId="selectedPetId"
        :selectedPetDetails="selectedPetDetails"
        :loadingPetDoctorHistory="loadingPetDoctorHistory"
        :loadSelectedPetDetailsHistory="loadSelectedPetDetailsHistory"
        @click:selectPet="selectPet"
        @click:addPetRecord="addPetRecord"
        @click:addVisit="addNewVisit"
        @click:close="closeUserDetails"
      />
    </section>
    <Modal :show="addNewUserForm" >
     <div slot="header" class="px-5 py-3 border-b border-black">
        <p class="text-xl">Create User</p>
      </div>
      <form class="px-5 py-3">
        <div>
          <label class="text-sm font-semibold">Emirates ID</label>
          <input v-model="user.emiratesId" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Emirates ID" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Person Name</label>
          <input v-model="user.name" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Person Name" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Email</label>
          <input v-model="user.email" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="email" placeholder="Email" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Phone No</label>
          <input v-model="user.contact" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Phone"/>
        </div>
        <div class="mt-12 flex justify-between">
          <div>
            <button @click="confirmCreateUser()" type="button" class="px-3 py-1 bg-indigo-500 text-white rounded shadow">Confirm</button>
            <button @click="resetUserData()" type="button" class="ml-1 px-5 py-1 bg-gray-500 text-white rounded shadow">Clear</button>
          </div>
          <div>
            <button @click="toggleAddNewUser(false)" type="button" class="ml-1 px-5 py-1 bg-red-500 text-white rounded shadow">Close</button>
          </div>
        </div>
      </form>
    </Modal>
    <Modal :show="createAppointmentModal" >
     <div slot="header" class="px-5 py-3 border-b border-black">
        <p class="text-xl">Visit Details</p>
      </div>
      <form class="px-5 py-3">
        <div>
          <div>
            <p>
              Visit type :
            </p>
          </div>
          <div class="pl-1">
            <div class="mt-2">
              <label class="">
                <input v-model="appointmentDetails.grooming" type="checkbox" name="type" id="grooming" value="2" />
                <span class="ml-3 text-base" >Grooming</span>
              </label>

              <div class="px-3 mt-8">
                <div v-if="appointmentDetails.grooming">
                  <div class="pb-2 border-b border-black mb-5 flex justify-between items-center">
                    <p class="">Description</p>
                    <div>
                      <button @click="addGroomingInvoiceItem" type="button" class="px-2 py-1 bg-indigo-500 text-white rounded text-sm">&#10010; Add Row</button>
                    </div>
                  </div>
                  <div>
                    <ul>
                      <li class="flex justify-between">
                        <div class="w-7/12 p-1 font-semibold">Item</div>
                        <div class="w-5/12 p-1 font-semibold">Price</div>
                      </li>
                      <li v-for="descriptionInvoiceItem in groomingInvoiceItems" :key="descriptionInvoiceItem.id" class="flex justify-between items-center">
                        <div class="w-7/12">
                          <input v-model="descriptionInvoiceItem.item" class="w-full border border-black border-r-0 p-1 pl-3" type="text" placeholder="Item Name"/>
                        </div>
                        <div class="w-4/12">
                          <input v-model="descriptionInvoiceItem.price" class="w-full border border-black p-1 pl-3" type="price" placeholder="0.00"/>
                        </div>
                        <div class="w-1/12">
                          <button @click="removeGroomingInvoiceItem(descriptionInvoiceItem.id)" type="button" v-if="groomingInvoiceItems.length != 1" class="p-1 ml-1 text-red-500 cursor-pointer">&#10005;</button>
                        </div>
                      </li>
                      <li class="flex justify-between">
                        <div class="w-7/12">
                          <p class="flex justify-end pr-1 pt-1">
                            Total Amount : 
                          </p>
                        </div>
                        <div class="w-4/12">
                          <input class="w-full border border-black border-t-0 p-1 pl-3" type="price" placeholder="0.00" :value="totalGroomingPrice" />
                        </div>
                        <div class="w-1/12"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-1">
              <label class="">
                <input v-model="appointmentDetails.shopping" type="checkbox" name="type" id="shopping" value="1" />
                <span class="ml-3 text-base" >Shopping</span>
              </label>

              <div class="px-3 mt-8">
                <div v-if="appointmentDetails.shopping">
                  <div class="pb-2 border-b border-black mb-5 flex justify-between items-center">
                    <p class="">Description</p>
                    <div>
                      <button @click="addDescriptionInvoiceItem" type="button" class="px-2 py-1 bg-indigo-500 text-white rounded text-sm">&#10010; Add Row</button>
                    </div>
                  </div>
                  <div>
                    <ul>
                      <li class="flex justify-between">
                        <div class="w-7/12 p-1 font-semibold">Item</div>
                        <div class="w-5/12 p-1 font-semibold">Price</div>
                      </li>
                      <li v-for="descriptionInvoiceItem in descriptionInvoiceItems" :key="descriptionInvoiceItem.id" class="flex justify-between items-center">
                        <div class="w-7/12">
                          <input v-model="descriptionInvoiceItem.item" class="w-full border border-black border-r-0 p-1 pl-3" type="text" placeholder="Item Name"/>
                        </div>
                        <div class="w-4/12">
                          <input v-model="descriptionInvoiceItem.price" class="w-full border border-black p-1 pl-3" type="price" placeholder="0.00"/>
                        </div>
                        <div class="w-1/12">
                          <button @click="removeDescriptionInvoiceItem(descriptionInvoiceItem.id)" type="button" v-if="descriptionInvoiceItems.length != 1" class="p-1 ml-1 text-red-500 cursor-pointer">&#10005;</button>
                        </div>
                      </li>
                      <li class="flex justify-between">
                        <div class="w-7/12">
                          <p class="flex justify-end pr-1 pt-1">
                            Total Amount : 
                          </p>
                        </div>
                        <div class="w-4/12">
                          <input class="w-full border border-black border-t-0 p-1 pl-3" type="price" placeholder="0.00" :value="totalPrice" />
                        </div>
                        <div class="w-1/12"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-1">
              <label class="">
                <input v-model="appointmentDetails.doctor" type="checkbox" name="type" id="doctor" value="3" />
                <span class="ml-3 text-base" >Doctor</span>
              </label>

              <div class="px-3 mt-8">
                <div v-if="appointmentDetails.doctor">
                  <div class="pb-2 border-b border-black mb-5 flex justify-between items-center">
                    <p class="">Description</p>
                  </div>
                  <div class="w-full mb-3 ">
                    <label>Follow Up</label>
                    <select class="mt-2 rounded bg-white py-2 px-2 w-full border border-black focus:outline-none" v-model="doctorFollowUp" >
                      <option :value="true">Yes</option>
                      <option :value="false">No</option>
                    </select>
                  </div>
                  <div class="w-full">
                    <label>Fees</label>
                    <input class="mt-2 rounded py-1 px-2 w-full border border-black focus:outline-none" :disabled="doctorFollowUp" type="text" v-model="doctorFees" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 flex justify-between">
          <div>
            <button @click="addAppointmentRecord()" type="button" class="px-3 py-1 bg-indigo-500 text-white rounded shadow">Confirm</button>
            <button @click="resetAppointmentData()" type="button" class="ml-1 px-5 py-1 bg-gray-500 text-white rounded shadow">Clear</button>
          </div>
          <div>
            <button @click="closeCreateNewAppointment(false)" type="button" class="ml-1 px-5 py-1 bg-red-500 text-white rounded shadow">Close</button>
          </div>
        </div>
      </form>
    </Modal>
    <Modal :show="createPetRecordModal" >
     <div slot="header" class="px-5 py-3 border-b border-black">
        <p class="text-xl">Add pet record</p>
      </div>
      <form class="px-5 py-3">
        <div>
          <label class="text-sm font-semibold">Statement</label>
          <input v-model="petRecord.statement" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Statement" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Prescription</label>
          <input v-model="petRecord.prescription" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Prescription" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Description</label>
          <input
            v-model="petRecord.description"
            class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900"
            type="text"
            placeholder="Description"
          />
        </div>
        <div class="mt-12 flex justify-between">
          <div>
            <button @click="confirmCreatePetRecord()" type="button" class="px-3 py-1 bg-indigo-500 text-white rounded shadow">Confirm</button>
            <button @click="resetPetData()" type="button" class="ml-1 px-5 py-1 bg-gray-500 text-white rounded shadow">Clear</button>
          </div>
          <div>
            <button @click="cancelCreatePetRecord(false)" type="button" class="ml-1 px-5 py-1 bg-red-500 text-white rounded shadow">Close</button>
          </div>
        </div>
      </form>
    </Modal>
  </section>
</DashboardLayout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import DashboardLayout from '../../layouts/DashbordLayout.vue'
import Modal from '../../components/Modal.vue'

import TopBar from './TopBar.vue'
import SearchBar from './SearchBar.vue'
import SearchedUser from './SearchedUser.vue'
import UserDetails from './UserDetails.vue'
export default {
  name: 'Home',
  data () {
    return {
      patientLoading: true,
      searchLoading: false,
      loadingPetDoctorHistory: false,
      loadSelectedPetDetailsHistory: false,

      addNewUserForm: false,
      user: {
        id: '',
        emiratesId: '',
        name: '',
        email: '',
        contact: ''
      },

      createAppointmentModal: false,
      createAppointmentUserId: '',
      groomingInvoiceItems: [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ],
      descriptionInvoiceItems: [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ],

      doctorFollowUp: false,
      doctorFees: null,

      appointmentDetails: {
        grooming: false,
        shopping: false,
        doctor: false
      },

      users: [],

      activeUserId: null,
      activeOrderId: null,
      activeUser: {},

      selectedPetId: null,
      selectedPetDetails: {
        pet: {
          id: '1',
          name: 'Tom',
          color: 'Black',
          age: '2',
          type: 'Dog'
        },
        history: []
      },

      createPetRecordModal: false,
      petRecordId: null,
      petRecord: {
        id: '',
        statement: '',
        prescription: '',
        description: ''
      }
    }
  },
  computed: {
    totalGroomingPrice () {
      return this.groomingInvoiceItems.reduce((acc, item) => {
        acc += +item.price
        return acc
      }, 0)
    },
    totalPrice () {
      return this.descriptionInvoiceItems.reduce((acc, item) => {
        acc += +item.price
        return acc
      }, 0)
    },
    ...mapState({
      isDoctor: state => state.currentRole == 'doctor'
    })
  },
  components: {
    DashboardLayout,
    Modal,
    TopBar,
    SearchBar,
    SearchedUser,
    UserDetails,
  },
  methods: {
    searchUser (query) {
      const data = {
        query
      }
      this.searchLoading = true
      this.searchPatientUser(data)
        .then(resp => {
          this.searchLoading = false
          this.users = resp.data.rows
        })
        .catch(err => {
          this.searchLoading = false
          console.log(err)
        })
    },

    addNewVisit () {
      this.createAppointmentUserId = this.activeUserId
      this.toggleCreateNewAppointment(true)
    },

    selectPet (petId) {
      this.selectedPetId = petId

      if (this.isDoctor) {
        this.loadingPetDoctorHistory = true
        const query = {
          petId: this.selectedPetId
        }

        this.loadPetDoctorHistory(query)
          .then(resp => {
            this.selectedPetDetails.history = resp.data.rows
            this.loadingPetDoctorHistory = false
          })
          .catch(err => {
            console.log(err)
            this.loadingPetDoctorHistory = false
          })
      }
    },

    selectActiveUser (user) {
      this.activeUserId = user.id
      this.activeOrderId = user.orderId || null
      this.activeUser = user

      if (!this.isDoctor) {
        this.loadSelectedPetDetailsHistory = true
        const query = {
          search: user.emiratesId
        }

        this.loadUserHistory(query)
          .then(resp => {
            this.selectedPetDetails.history = resp.data.rows
            this.loadSelectedPetDetailsHistory = false
          })
          .catch(err => {
            console.log(err)
            this.loadSelectedPetDetailsHistory = false
          })
      }
    },

    toggleAddNewUser (status) {
      this.addNewUserForm = status == undefined ? !this.addNewUserForm : status
    },

    toggleCreateNewAppointment (status) {
      console.log('coming here')
      if (this.createAppointmentUserId) {
        console.log('coming in here', status)
        this.createAppointmentModal = status == undefined ? !this.createAppointmentModal : status
      }
    },

    closeCreateNewAppointment (status) {
      this.toggleCreateNewAppointment(status)
      this.createAppointmentUserId = ''
    },

    addGroomingInvoiceItem () {
      this.groomingInvoiceItems.push({
        id: new Date().toTimeString(),
        item: '',
        price: ''
      })
    },

    removeGroomingInvoiceItem (id) {
      this.groomingInvoiceItems = this.groomingInvoiceItems.filter(item => item.id !== id)
    },

    addDescriptionInvoiceItem () {
      this.descriptionInvoiceItems.push({
        id: new Date().toTimeString(),
        item: '',
        price: ''
      })
    },

    removeDescriptionInvoiceItem (id) {
      this.descriptionInvoiceItems = this.descriptionInvoiceItems.filter(item => item.id !== id)
    },

    addAppointmentRecord () {
      const record = {
        patientId: this.createAppointmentUserId,
        appointment: this.appointmentDetails.doctor,
        description: 'Invoice',
        details: []
      }

      if (this.appointmentDetails.grooming) {
        const data = this.groomingInvoiceItems.map(item => {
          const tempData = {...item, serviceId: 2}
          delete tempData.id
          return tempData
        })

        record.details = record.details.concat(data)
      }

      if (this.appointmentDetails.shopping) {
        const data = this.descriptionInvoiceItems.map(item => {
          const tempData = {...item, serviceId: 1}
          delete tempData.id
          return tempData
        })

        record.details = record.details.concat(data)
      }

      if (this.appointmentDetails.doctor) {
        const invoiceItem = {
          item:  'Doctor\'s Fee',
          price: (this.doctorFees || 0),
          serviceId: 3
        }

        record.details.push(invoiceItem)
      }

      const data = {
        record
      }

      console.log(data)

      this.storeNewAppointmentRecord(data)
        .then(resp => {
          this.selectedPetDetails.history.unshift({ ...resp.data })
          this.resetAppointmentData()
          this.closeCreateNewAppointment(false)
        })
        .catch(err => {
          console.log(err)
        })
    },

    confirmCreateUser () {
      const data = {
        id: this.user.id,
        user: {...this.user}
      }

      delete data.user.id

      this.storePatientUser(data)
        .then(resp => {
          this.users.unshift({ ...resp.data})

          this.toggleAddNewUser(false)

          this.activeUserId = this.user.id
          // this.toggleCreateNewAppointment(true)

          this.resetUserData()
        })
        .catch(err => {
          console.log(err)
        })
    },

    toggleCreatePetRecordModal (status) {
      this.createPetRecordModal = status == undefined ? !this.createPetRecordModal : status
    },

    cancelCreatePetRecord () {
      this.resetPetData()
      this.toggleCreatePetRecordModal(false)
    },

    confirmCreatePetRecord () {
      const record = {
        data: { ...this.petRecord, petId: this.selectedPetId, orderId: this.activeOrderId }
      }

      delete record.data.id

      this.addPetTreatmentHistory(record)
        .then((resp) => {
          console.log(resp.data)
          this.selectedPetDetails.history.unshift({ ...this.petRecord })
          this.cancelCreatePetRecord(false)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addPetRecord (petId) {
      this.petRecordId = petId
      this.toggleCreatePetRecordModal(true)
    },

    closeUserDetails () {
      this.activeUserId = null
      this.selectedPetId = null
    },

    resetPetData () {
      this.petRecordId = null
      this.petRecord.id = ''
      this.petRecord.statement = ''
      this.petRecord.treatment = ''
      this.petRecord.description = ''
    },

    resetUserData () {
      this.user.id = ''
      this.user.emiratesId = ''
      this.user.name = ''
      this.user.email = ''
      this.user.contact = ''
    },

    resetAppointmentData () {
      this.appointmentDetails.doctor = false
      this.appointmentDetails.grooming = false
      this.appointmentDetails.shopping = false

      this.groomingInvoiceItems = [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ]
      this.descriptionInvoiceItems = [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ]
    },

    ...mapActions([
      'searchPatientUser',
      'storePatientUser',
      'getAllPatientUsers',
      'storeNewAppointmentRecord',
      'loadUserHistory',
      'addPetTreatmentHistory',
      'loadPetDoctorHistory'
    ])
  },
  mounted () {
    this.patientLoading = true
    this.getAllPatientUsers()
      .then(resp => {
        this.users = resp.data.rows
        this.patientLoading = false
      })
      .catch(err => {
        this.patientLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
.searched-users {
  height: 70vh;
  overflow: auto;
  grid-template-rows: auto 1fr;
  .user-fit-content {
    height: fit-content;
  }
}
</style>

<style>
.animate-spin {
  border-color: #aaa;
  border-top-color: #333;
}
</style>