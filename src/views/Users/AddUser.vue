<template>
  <DashboardLayout>
    <div class="bg-gray-200 min-h-screen rounded px-12 py-10 flex flex-col">
      <form
        @submit.prevent="createUser"
        class="rounded flex flex-col bg-white p-10"
      >
        <div class="my-5">
          <h2 class="text-2xl border-b border-black pb-3">Add New User</h2>
        </div>
        <div class="-mx-3 md:flex mb-6 mt-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-emirates"
            >
              Emirates ID
            </label>
            <input
              v-model="user.emiratesId"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter focus:border-indigo-500 focus:outline-none rounded py-3 px-4 mb-3"
              id="grid-emirates"
              type="text"
              placeholder="Enter Emirates ID here"
            />
            <p class="text-grey-dark text-xs italic">Required field</p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-name"
            >
              Name
            </label>
            <input
              v-model="user.name"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red focus:border-indigo-500 focus:outline-none rounded py-3 px-4 mb-3"
              id="grid-name"
              type="text"
              placeholder="Jane"
            />
            <p class="text-red text-xs italic">Please fill out this field.</p>
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-contact"
            >
              Contact
            </label>
            <input
              v-model="user.contact"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter focus:border-indigo-500 focus:outline-none rounded py-3 px-4"
              id="grid-contact"
              type="text"
              placeholder="Enter contact here"
            />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-username"
            >
              Username
            </label>
            <input
              v-model="user.username"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter focus:border-indigo-500 focus:outline-none rounded py-3 px-4 mb-3"
              id="grid-username"
              type="text"
              placeholder="Enter Username here"
            />
            <p class="text-grey-dark text-xs italic">Required field</p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              v-model="user.password"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter focus:border-indigo-500 focus:outline-none rounded py-3 px-4 mb-3"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
            <p class="text-grey-dark text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-email"
            >
              Email
            </label>
            <input
              v-model="user.email"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter focus:border-indigo-500 focus:outline-none rounded py-3 px-4"
              id="grid-email"
              type="text"
              placeholder="Enter Email here"
            />
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-role"
            >
              Role
            </label>
            <div class="relative">
              <select
                v-model="user.role"
                class="block appearance-none w-full bg-white border border-grey-lighter text-grey-darker focus:border-indigo-500 focus:outline-none py-3 px-4 pr-8 rounded"
                id="grid-state"
              >
                <option value="1">Administrator</option>
                <option value="2">Receiptionist</option>
                <option value="3">Doctor</option>
              </select>
              <div
                class="pointer-events-none absolute top-4 right-3 pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-status"
            >
              Active State
            </label>
            <div class="relative">
              <select
                v-model="user.active"
                class="block appearance-none w-full bg-white border border-grey-lighter text-grey-darker focus:border-indigo-500 focus:outline-none py-3 px-4 pr-8 rounded"
                id="grid-status"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <div
                class="pointer-events-none absolute top-4 right-3 pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="md:flex mt-5">
          <button
            class="appearance-none block w-full bg-indigo-500 text-white border border-grey-lighter rounded py-3 px-4"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapActions } from "vuex";
import DashboardLayout from "../../layouts/DashbordLayout.vue";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        emiratesId: "",
        name: "",
        contact: "",
        username: "",
        password: "",
        email: "",
        role: "",
        active: true
      },
    };
  },
  components: {
    DashboardLayout,
  },
  methods: {
    createUser() {
      this.storeUser({ user: this.user })
        .then(() => {
          this.$router.push("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ...mapActions(["storeUser"]),
  },
};
</script>
