<template>
<DashboardLayout>
  <section class="flex justify-around pt-14 bg-gray-100 min-h-screen">
    <section class="w-4/12">
      <TopBar />
      <SearchBar />
      <div class="searched-users flex flex-col gap-y-3 mt-5">
        <SearchedUser />
        <SearchedUser />
        <SearchedUser />
        <SearchedUser />
        <SearchedUser />
        <SearchedUser />
        <SearchedUser />
      </div>
    </section>
    <section class="w-3/6">
      <UserDetails />
    </section>
  </section>
</DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashbordLayout.vue'
import TopBar from './Home/TopBar.vue'
import SearchBar from './Home/SearchBar.vue'
import SearchedUser from './Home/SearchedUser.vue'
import UserDetails from './Home/UserDetails.vue'
export default {
  name: 'Home',
  components: {
    DashboardLayout,
    TopBar,
    SearchBar,
    SearchedUser,
    UserDetails
  }
}
</script>

<style lang="scss" scoped>
.searched-users {
  height: 70vh;
  overflow: auto;
}
</style>