<template>
  <aside class="sidebar h-screen pt-14 flex flex-col justify-between shadow-2xl">
    <section>
      <section class="user-profile flex justify-center">
        <div class="flex flex-col justify-center items-center">
          <div class="avatar h-24 w-24 bg-black rounded-full"></div>
          <p class="text-xl font-medium mt-3">Jahanzeb Ahmed</p>
        </div>
      </section>
      <nav class="w-full mt-10">
        <ul>
          <li>
            <router-link to="/" class="block text-xl py-2 px-8 flex items-center border-l-2 hover:border-indigo-600 cursor-pointer ">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="ml-3">Dashbord</span>
            </router-link>
          </li>
          <li class="mt-2">
            <router-link to="/users" class="block text-xl py-2 px-8 flex items-center border-l-2 hover:border-indigo-600 cursor-pointer">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="ml-3">Users</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="mb-5">
      <a @click.prevent="" class="block text-xl py-2 px-8 flex items-center border-l-2 hover:border-indigo-600 cursor-pointer">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="ml-3">Logout</span>
      </a>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'AppLeftBar',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  width: 290px;
}
</style>
