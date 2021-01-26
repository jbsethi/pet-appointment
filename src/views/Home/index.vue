<template>
<DashboardLayout>
  <section class="flex justify-around pt-14 bg-gray-200 min-h-screen">
    <section :class="activeUserId ? 'w-4/12' : 'w-11/12'">
      <TopBar @click:addNewUser="toggleAddNewUser()"/>
      <SearchBar />
      <div
        class="searched-users mt-5"
        :class="activeUserId ? 'flex flex-col gap-3' : 'grid grid-cols-3 gap-4'"
      >
        <SearchedUser
          class="cursor-pointer hover:bg-gray-50"
          v-for="user in users"
          :key="user.id"
          :user="user"
          :class="activeUserId ? '' : 'user-fit-content'"
          @click="activeUserId = user.id"
        />
      </div>
    </section>
    <section v-if="activeUserId" class="w-7/12">
      <UserDetails
        :pets="pets"
        :selectedPetId="selectedPetId"
        :selectedPetDetails="selectedPetDetails"
        @click:addPet="toggleAddNewUserPet"
        @click:selectPet="selectPet"
        @click:close="activeUserId = null"
        @click:addPetRecord="addPetRecord"
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
          <input v-model="user.phone" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Phone"/>
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
                <input v-model="appointmentDetails.type" type="radio" name="visit_type" value="grooming" />
                <span class="ml-3 text-base" >Grooming</span>
              </label>
            </div>
            <div class="mt-1">
              <label class="">
                <input v-model="appointmentDetails.type" type="radio" name="visit_type" value="shopping" />
                <span class="ml-3 text-base" >Shopping</span>
              </label>
            </div>
            <div class="mt-1">
              <label class="">
                <input v-model="appointmentDetails.type" type="radio" name="visit_type" value="doctor" />
                <span class="ml-3 text-base" >Doctor</span>
              </label>
            </div>
          </div>
        </div>
        <div class="px-3 mt-8">
          <div v-if="appointmentDetails.type == 'doctor'">Doctor</div>
          <div v-else>
            <div class="pb-2 border-b border-black mb-5 flex justify-between items-center">
              <p class="">{{ appointmentDetails.type[0].toUpperCase() + appointmentDetails.type.slice(1) }} Description</p>
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
                    <input class="w-full border border-black border-t-0 p-1 pl-3" type="price" placeholder="0.00"/>
                  </div>
                  <div class="w-1/12"></div>
                </li>
              </ul>
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
    <Modal :show="createPetUserModal" >
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
          <input v-model="pet.type" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Cat, Dog etc"/>
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
          <label class="text-sm font-semibold">Treatment</label>
          <input v-model="petRecord.treatment" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Treatment" />
        </div>
        <div class="mt-3">
          <label class="text-sm font-semibold">Description</label>
          <input v-model="petRecord.description" class="w-full border border-black rounded py-2 px-3 mt-1 text-grey-700 text-base focus:outline-none focus:border-indigo-900" type="text" placeholder="Description" />
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
      addNewUserForm: false,
      user: {
        id: '',
        emiratesId: '',
        name: '',
        email: '',
        phone: ''
      },

      createAppointmentModal: false,
      createAppointmentUserId: '',
      descriptionInvoiceItems: [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ],

      appointmentDetails: {
        type: 'doctor'
      },

      users: [  // init users
        {
          id: '1',
          emiratesId: '123456789',
          name: 'Wasiq Naqi',
          email: 'wasiqnaqi@gmail.com',
          phone: '03129632584'
        },
        {
          id: '2',
          emiratesId: '456789123',
          name: 'Jahanzeb Sethi',
          email: 'jahanzebsethi@gmail.com',
          phone: '03129741852'
        },
        {
          id: '3',
          emiratesId: '123456789',
          name: 'Khan sahab',
          email: 'khansahab@gmail.com',
          phone: '03129632584'
        },
        {
          id: '4',
          emiratesId: '456789123',
          name: 'Afran Khan',
          email: 'Afran Khan@gmail.com',
          phone: '03129741852'
        }
      ],

      activeUserId: null,
      createPetUserModal: false,

      pet: {
        id: '',
        name: '',
        color: '',
        age: '',
        type: ''
      },

      pets: [
        {
          id: '1',
          name: 'Tom',
          color: 'Black',
          age: '2',
          type: 'Dog'
        },
        {
          id: '2',
          name: 'Edgar',
          color: 'Lightbrown',
          age: '1',
          type: 'Dog'
        }
      ],

      selectedPetId: null,
      selectedPetDetails: {
        pet: {
          id: '1',
          name: 'Tom',
          color: 'Black',
          age: '2',
          type: 'Dog'
        },
        history: [
          {
            id: 2,
            statement: 'follow up',
            treatment: '25mg Tablet',
            description: 'Got better',
            date: '23-1-2021'
          },
          {
            id: 1,
            statement: 'High fever',
            treatment: '25mg Tablet',
            description: 'Complete rest for a week',
            date: '23-1-2021'
          }
        ]
      },

      createPetRecordModal: false,
      petRecordId: null,
      petRecord: {
        id: '',
        statement: '',
        treatment: '',
        description: '',
        date: '23-1-2021'
      }
    }
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
    selectPet (petId) {
      this.selectedPetId = petId
    },

    toggleAddNewUser (status) {
      this.addNewUserForm = status == undefined ? !this.addNewUserForm : status
    },

    toggleCreateNewAppointment (status) {
      if (this.createAppointmentUserId) {
        this.createAppointmentModal = status == undefined ? !this.createAppointmentModal : status
      }
    },

    toggleAddNewUserPet (status) {
      this.createPetUserModal = status == undefined ? !this.createPetUserModal : status
    },

    closeCreateNewAppointment (status) {
      this.toggleCreateNewAppointment(status)
      this.createAppointmentUserId = ''
    },

    cancelCreateUserPet () {
      this.toggleAddNewUserPet(false)
      this.resetUserPetData()
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
      const data = {
        userId: this.createAppointmentUserId,
        visitType: this.appointmentDetails.type,
        items: this.descriptionInvoiceItems.map(item => {
          return {...item}
        })
      }

      this.resetAppointmentData()

      console.log(data)
      this.closeCreateNewAppointment(true)
    },

    confirmCreateUser () {
      this.user.id = new Date().toTimeString()
      this.users.unshift({ ...this.user })
      this.toggleAddNewUser(false)

      this.createAppointmentUserId = this.user.id
      this.toggleCreateNewAppointment(true)

      this.resetUserData()
    },

    confirmCreateUserPet () {
      this.pet.id = new Date().toTimeString()
      this.pets.push({ ...this.pet })

      this.cancelCreateUserPet()
    },

    toggleCreatePetRecordModal (status) {
      this.createPetRecordModal = status == undefined ? !this.createPetRecordModal : status
    },

    cancelCreatePetRecord () {
      this.resetPetData()
      this.toggleCreatePetRecordModal(false)
    },

    confirmCreatePetRecord () {
      this.selectedPetDetails.history.unshift({ ...this.petRecord })
      this.cancelCreatePetRecord(false)
    },

    addPetRecord (petId) {
      this.petRecordId = petId
      this.toggleCreatePetRecordModal(true)
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
      this.user.phone = ''
    },

    resetAppointmentData () {
      this.appointmentDetails.type = 'doctor'
      this.descriptionInvoiceItems = [
        {
          id: new Date().toTimeString(),
          item: '',
          price: ''
        }
      ]
    },

    resetUserPetData () {
      this.pet.id = ''
      this.pet.name = ''
      this.pet.dob = ''
      this.pet.age = ''
      this.pet.type = ''
    }
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