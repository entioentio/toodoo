import {computed, reactive} from 'vue';
import { getActiveTooDoos, createTooDoo, removeTooDoo, updateTooDoo, resortTooDoos } from "@/api";

const sourceTasks = reactive({
	list: []
});

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

export default function useTasks() {
	const tasks = computed(() => {
		return sourceTasks.list
			.sort((a, b) => a.sort - b.sort)
			.reduce((acc, task) => {
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
		const tasksPool = tasks.value[status];

		const sort = tasksPool
			? tasksPool.sort((a, b) => b.sort - a.sort)[0].sort + 100
			: 0;

		const newTask = reactive({ id: uuidv4(), title, status, sort });
		sourceTasks.list.push(newTask);

		createTooDoo({title, status, sort})
			.then(({ data, ref }) => {
				newTask.id = ref.id;
				newTask.created_at = data.created_at;
			}).catch(error => {
				// TODO: saving task failed. Show error, retry?
				//reject(error)
			})
	}

	function removeTask (id) {
		removeTooDoo(id)
		sourceTasks.list = sourceTasks.list.filter(t => t.id !== id)
	}

	function updateTask (id, value, field = 'title') {
		updateTooDoo({id, value, field})
	}

	function resortTasks (tasksToUpdate) {
		const payload = tasksToUpdate.map((item, index) => [item.id, index * 100])
		resortTooDoos(payload);

		payload.forEach((item) => {
			const match = sourceTasks.list.find(sourceItem => item[0] === sourceItem.id);
			if (!match) return;

			match.sort = item[1];
		})
	}

	return {
		tasks,
		loadTasks,
		createTask,
		removeTask,
		updateTask,
		resortTasks
	}
}