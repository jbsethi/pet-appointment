<template>
  <DashboardLayout>
    <div class="bg-gray-200 min-h-screen rounded px-12 pt-10 flex flex-col">
      <div class="my-5 flex justify-between border-b border-black pb-3">
        <h2 class="text-2xl">Orders</h2>
      </div>
      <div>
        <div class="overflow-auto">
          <table class="min-w-full table-auto">
            <thead class="justify-between">
              <tr class="bg-gray-800">
                <th class="px-16 py-2">
                  <span class="text-gray-300">id</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Description</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Created At</span>
                </th>
                <th class="px-16 py-2">
                  <span class="text-gray-300">Price</span>
                </th>
                <!-- <th class="px-16 py-2">
                  <span class="text-gray-300">Status</span>
                </th> -->
              </tr>
            </thead>
            <tbody v-if="ordersLoading" class="bg-gray-200">
              <tr class="bg-white border-4 border-gray-200">
                <td colspan="5">
                  <div class="flex justify-center items-center py-20">
                    <div class="animate-spin rounded-full border-4 h-16 w-16"></div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-gray-200">
              <tr v-for="o in orders" :key="o.id" class="bg-white border-4 border-gray-200">
                <td class="px-16 py-2">
                  <span class="text-center ml-2 font-semibold">{{ o.id }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ o.description }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ o.createdAt }}</span>
                </td>
                <td class="px-16 py-2">
                  <span>{{ o.price }}</span>
                </td>

                <!--  <td class="px-16 py-2">
                  <span :class="u.active ? 'text-green-500' : 'text-red-500'">
                    {{ u.active ? 'Active' : 'Inactive' }}
                  </span>
                </td> -->
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
  name: "Orders",
  data() {
    return {
      ordersLoading: true,
      orders: []
    }
  },
  components: {
    DashboardLayout,
  },
  methods: {
    ...mapActions([
      'getOrders'
    ])
  },
  mounted () {
    this.ordersLoading = true
    this.getOrders()
      .then(resp => {
        this.ordersLoading = false
        this.orders = resp.data.rows || []
      })
      .catch(err => {
        this.ordersLoading = false
        console.log(err)
      })
  }
};
</script>

<style lang="scss" scoped></style>
