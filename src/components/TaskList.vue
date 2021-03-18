<template>
  <div v-for="task in tasks">{{ task.name }}</div>
  <input v-model.trim="newTask" @keypress.enter="addTask">
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const tasks = reactive([{name: 'test todo', status: 0}, {name: 'test doing', status: 1}]);
    const newTask = ref('');

    function addTask (name) {
      tasks.push({ name: newTask.value, status: 0});
    }

    return {
      newTask,
      tasks,
      addTask
    }
  }
}
</script>

<style scoped>

</style>