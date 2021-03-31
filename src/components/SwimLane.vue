<template>
  <section class="m-2 flex-shrink flex flex-col" :title="label">
    <header class="m-3 font-medium text-xl flex-grow-0" v-if="label" :title="label">{{ label }}</header>
    <div class="m-3 relative flex-grow-0" :title="`Create new item with status ${label}`">
      <input class="bg-transparent hover:bg-white focus:bg-white rounded-sm p-2 shadow-sm placeholder-gray-500 w-full outline-none focus:ring-2 focus:ring-blue-600" placeholder="Add toodoo..." v-model.trim="newTask" @keypress.enter="submitTask" title="Item content"/>
      <button @click="submitTask" class="focus:outline-none text-gray-400 absolute right-2 top-3" aria-label="Submit">
        <svg height="18" width="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px"><title>UI</title><g data-name="Layer 3"><path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Z"></path><polygon points="13 7 11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11 13 7"></polygon></g></svg>
      </button>
    </div>

    <draggable
        v-model="currentContextTasks"
        item-key="id"
        group="tasks"
        class="flex-grow"
        :sort="true"
        @change="moveCallback"
    >
      <template #item="{ element }">
        <div><single-task class="m-3" :title="element.title" :id="element.id"/></div>
      </template>
    </draggable>
  </section>
</template>

<script>
import {computed, ref, toRefs} from 'vue';
import SingleTask from './SingleTask.vue';
import useTasks from "../composables/useTasks";
import draggable from 'vuedraggable'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      required: true
    }
  },
  async setup(props) {
    const { status, label } = toRefs(props);

    const newTask = ref('');

    const { tasks, createTask, resortTasks, updateTask } = useTasks();

    const currentContextTasks = computed({
      get: () => {
        return tasks.value[status.value]
      },
      set: (value) => {
        resortTasks(value.reverse())
      }
    });

    function submitTask() {
      createTask(newTask.value, status.value);
      newTask.value = '';
    }

    function moveCallback({ added }) {
      if (added) {
        added.element.status = status.value;
        updateTask(added.element.id, status.value, 'status');
      }
    }

    return {
      draggable,
      currentContextTasks,
      tasks,
      label,
      newTask,
      submitTask,
      SingleTask
    }
  }
}
</script>

<style scoped>

</style>