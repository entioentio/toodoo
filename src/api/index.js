import { Client, query } from 'faunadb';
//const query = Client.query;

window.global = window;

const dbClient = new Client({
	secret: import.meta.env.VITE_FAUNADB_SERVER_SECRET
});

const now = () => Math.floor(Date.now() / 1000)

export const getActiveTooDoos = () => {
	return new Promise((resolve, reject) => {
		dbClient.query(
			query.Map(
				query.Paginate(
					query.Match(query.Index('active_taasks'), true)
				),
				query.Lambda('x', query.Get(query.Var('x')))
			)
		).then(response => {
			console.log(response)
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createTooDoo = ({title, status = 0}) => {
	return new Promise((resolve, reject) => {
		dbClient.query(
			query.Create(
				query.Collection('taasks'), {
					data: {
						title,
						status,
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
		dbClient.query(
			query.Update(
				query.Ref(query.Collection('taasks'), id),
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
		dbClient.query(
			query.Update(
				query.Ref(query.Collection('taasks'), id),
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