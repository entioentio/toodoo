<template>
  <div class="min-h-screen sm:p-12">
    <Suspense>
      <template #default>
        <TaskList/>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>

import TaskList from "./components/TaskList.vue";

export default {
  setup () {
    return { TaskList }
  }
}
</script>

<style>
</style>