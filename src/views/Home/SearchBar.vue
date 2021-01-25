<template>
  <section class="search-bar mt-5 bg-white flex items-center rounded-md">
    <div class="px-4">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <div class="w-full rounded-md">
      <input type="text" class="py-4 w-full rounded-md" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss" scoped>
</style>
