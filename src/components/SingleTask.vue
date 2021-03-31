<template>
  <div class="bg-white rounded-sm p-2 shadow-sm group flex" :title="`Item: ${currentTitle}`">
    <div class="flex-1" title="Edit item">
      <input class="placeholder-gray-400 w-full outline-none" placeholder="Untitled toodoo..." v-model="currentTitle" :aria-label="currentTitle"/>
    </div>
    <button @click="remove" class="transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none focus:text-red-700" title="remove">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" height="17.2" width="17.2" viewBox="0 0 172 172" xml:space="preserve">
        <path fill="currentColor" d="M166.797,25.078h-13.672h-29.971V0H49.388v25.078H19.417H5.744v15h14.806l10,132.463h111.443l10-132.463h14.805V25.078z M64.388,15h43.766v10.078H64.388V15z M128.083,157.541H44.46L35.592,40.078h13.796h73.766h13.796L128.083,157.541z"/>
        <rect fill="currentColor" x="80.271" y="65.693" width="12" height="66.232"/>
        <rect fill="currentColor" x="57.271" y="65.693" width="12" height="66.232"/>
        <rect fill="currentColor" x="103.271" y="65.693" width="12" height="66.232"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { toRefs, ref } from 'vue';
import useTasks from "../composables/useTasks.js";
import { debouncedWatch } from '@vueuse/core'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  async setup(props) {
    const { id, title } = toRefs(props);

    const currentTitle = ref(title.value);

    const { removeTask, updateTask } = useTasks();

    const remove = () => {
      removeTask(id.value);
    }

    debouncedWatch(
        currentTitle,
        () => {
          updateTask(id.value, currentTitle.value);
        },
        { debounce: 2000 }
    );

    return {
      currentTitle,
      remove
    }
  }
}
</script>

<style scoped>

</style>