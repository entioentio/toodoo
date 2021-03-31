<template>
  <div class="flex justify-center content-end bg-gray-100">
    <swim-lane :status="0" @create-task="" @remove-task="removeTask">
      <div class="rounded-full transform translate-y-0.5 h-4 w-4 bg-red-700 inline-block"/>
      Todo
    </swim-lane>
    <swim-lane :status="1" @create-task="">
      <div class="rounded-full transform translate-y-0.5 h-4 w-4 bg-yellow-400 inline-block"/>
      Doing
    </swim-lane>
    <swim-lane :status="2" @create-task="">
      <div class="rounded-full transform translate-y-0.5 h-4 w-4 bg-green-600 inline-block"/>
      Done
    </swim-lane>
  </div>
</template>

<script>
import useTasks from "../composables/useTasks.js";
import SwimLane from "./SwimLane.vue";

export default {
  async setup() {
    function removeTask (id) {
      debugger
    }

    const { loadTasks, tasks } = useTasks();
    await loadTasks();

    return {
      SwimLane,
      tasks,
      removeTask
    }
  }
}
</script>

<style scoped>

</style>