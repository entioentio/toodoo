<template>
  <div class="flex justify-center content-end bg-gray-100">
    <swim-lane label="Todo" :status="0" @create-task="" @remove-task="removeTask"/>
    <swim-lane label="Doing" :status="1" @create-task=""/>
    <swim-lane label="Done" :status="2" @create-task=""/>
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