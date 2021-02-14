<template>
  <DashboardLayout>
    <div class="bg-gray-200 min-h-screen rounded px-12 pt-10 flex flex-col">
      <div class="my-5 flex justify-between border-b border-black pb-3">
        <h2 class="text-2xl">Users</h2>
        <router-link v-if="isAdministrator" class="px-3 py-2 bg-indigo-500 text-white rounded cursor-pointer" to="/users/add">Add New User</router-link>
      </div>
      <div>
        <div class="overflow-auto">
          <table class="min-w-full table-auto">
            <thead class="justify-between">
              <tr class="bg-gray-800">
                <th class="px-16 py-2">
                  <span class="text-gray-300">Name</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Username</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Email</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Phone</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Status</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="usersLoading" class="bg-gray-200">
              <tr class="bg-white border-4 border-gray-200">
                <td colspan="5">
                  <div class="flex justify-center items-center py-20">
                    <div class="animate-spin rounded-full border-4 h-16 w-16"></div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-gray-200">
              <tr v-for="u in users" :key="u.id" class="bg-white border-4 border-gray-200">
                <td class="px-16 py-2">
                  <span class="text-center ml-2 font-semibold">{{ u.name }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ u.username }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ u.email }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ u.contact }}</span>
                </td>

                <td class="px-16 py-2">
                  <span :class="u.active ? 'text-green-500' : 'text-red-500'">
                    {{ u.active ? 'Active' : 'Inactive' }}
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
import { mapActions, mapState } from 'vuex'
import DashboardLayout from "../../layouts/DashbordLayout.vue";
export default {
  name: "Users",
  data() {
    return {
      usersLoading: true,
      users: []
    }
  },
  computed: {
    ...mapState({
      isAdministrator: state => (state.currentRole == 'super' || state.currentRole == 'administrator' )
    })
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
    this.usersLoading = true
    this.getUsers()
      .then(resp => {
        this.usersLoading = false
        this.users = resp.data.rows || []
      })
      .catch(err => {
        this.usersLoading = false
        console.log(err)
      })
  }
};
</script>

<style lang="scss" scoped></style>
