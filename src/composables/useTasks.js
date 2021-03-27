import {computed, reactive} from 'vue';
import { getActiveTooDoos, createTooDoo, removeTooDoo, updateTooDoo } from "@/api";

const sourceTasks = reactive({
	list: []
});

export default function useTasks() {
	const tasks = computed(() => {
		return sourceTasks.list.reduce((acc, task) => {
			if (!acc[task.status]) {
				acc[task.status] = [];
			}

			acc[task.status].unshift(task)

			return acc
		}, [])
	});

	async function loadTasks () {
		const loadedData = await getActiveTooDoos();

		sourceTasks.list = loadedData.data.map(td => ({
			id: td.ref.value.id,
			...td.data
		}));
	}

	function createTask (title, status) {
		const newTask = {title, status};
		sourceTasks.list.push(newTask);
		createTooDoo(newTask);
	}

	function removeTask (id) {
		removeTooDoo(id)
		sourceTasks.list = sourceTasks.list.filter(t => t.id !== id)
	}

	function updateTask (id, value, field = 'title') {
		updateTooDoo({id, value, field})
	}

	return {
		tasks,
		loadTasks,
		createTask,
		removeTask,
		updateTask
	}
}