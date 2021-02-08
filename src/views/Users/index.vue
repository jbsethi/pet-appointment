<template>
  <DashboardLayout>
    <div class="bg-gray-200 min-h-screen rounded px-12 pt-10 flex flex-col">
      <div class="my-5 flex justify-between border-b border-black pb-3">
        <h2 class="text-2xl">Users</h2>
        <router-link class="px-3 py-2 bg-indigo-500 text-white rounded cursor-pointer" to="/users/add">Add New User</router-link>
      </div>
      <div>
        <div>
          <table class="min-w-full table-auto">
            <thead class="justify-between">
              <tr class="bg-gray-800">
                <th class="px-16 py-2">
                  <span class="text-gray-300">Name</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Invitation</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Date</span>
                </th>

                <th class="px-16 py-2">
                  <span class="text-gray-300">Time</span>
                </th>

                <th class="px-16 py-2">
                  <span class="text-gray-300">Status</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-200">
              <tr class="bg-white border-4 border-gray-200">
                <td>
                  <span class="text-center ml-2 font-semibold">Dean Lynch</span>
                </td>
                <td class="px-16 py-2">
                  <button
                    class="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black"
                  >
                    Open Link
                  </button>
                </td>
                <td class="px-16 py-2">
                  <span>05/06/2020</span>
                </td>
                <td class="px-16 py-2">
                  <span>10:00</span>
                </td>

                <td class="px-16 py-2">
                  <span class="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h5"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapActions } from 'vuex'
import DashboardLayout from "../../layouts/DashbordLayout.vue";
export default {
  name: "Users",
  data() {
    return {};
  },
  components: {
    DashboardLayout,
  },
  methods: {
    ...mapActions([
      'getUsers'
    ])
  },
  mounted () {
    this.getUsers()
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  }
};
</script>

<style lang="scss" scoped></style>
