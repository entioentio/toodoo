import { Client, query } from 'faunadb';
const q = query;

const client = new Client({
	secret: import.meta.env.VITE_FAUNADB_SERVER_SECRET
});

const now = () => Math.floor(Date.now() / 1000)

export const getActiveTooDoos = () => {
	return new Promise((resolve, reject) => {
		client.query(
			q.Map(
				q.Paginate(
					q.Match(q.Index('active_taasks'), true)
				),
				q.Lambda('x', q.Get(q.Var('x')))
			)
		).then(response => {
			console.log(response)
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createTooDoo = ({title, status, sort}) => {
	return new Promise((resolve, reject) => {
		client.query(
			q.Create(
				q.Collection('taasks'), {
					data: {
						title,
						status,
						sort,
						created_at: now()
					}
				}
			)
		).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const removeTooDoo = (id) => {
	return new Promise((resolve, reject) => {
		client.query(
			q.Update(
				q.Ref(query.Collection('taasks'), id),
				{ data: { 'deleted_at': now() } }
			)
		).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const updateTooDoo = ({id, value, field}) => {
	return new Promise((resolve, reject) => {
		client.query(
			q.Update(
				q.Ref(query.Collection('taasks'), id),
				{ data: {
					[field]: value,
					updated_at: now()
				} }
			)
		).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const resortTooDoos = input => {
	return new Promise((resolve, reject) => {
		client.query(
			q.Map(
				input,
				q.Lambda(
					['id', 'order'],
					q.Update(
						q.Ref(query.Collection('taasks'), q.Var('id')),
						{data: {'sort': q.Var('order')}}
					)
				)
			)
		).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}
