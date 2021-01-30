<template>
  <article
    class="w-full border border-indigo-100 bg-indigo-100 rounded p-2"
  >
    <p class="text-sm">Visit type: {{ history.type }}</p>
    <p v-if="history.type != 'shopping'" class="text-sm">Pet: {{ history.petNames.length == 1 ? history.petNames[0] : history.petNames.join(', ') }}</p>
    <small class="text-xs">{{ history.date }}</small>
  </article>
</template>

<script>
export default {
  props: {
    history: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>

</style>