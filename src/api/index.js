import { Client } from 'faunadb';
const query = Client.query;

const dbClient = new Client({
	secret: import.meta.env.VITE_FAUNADB_SERVER_SECRET
});

export const getTooDoos = () => {
	/*return dbClient.query(
		query.Map(
			query.Paginate(
				query.Match(query.Index('all_taasks'))
			),
			query.Lambda('x', query.Get(query.Var('x')))
		)
	).then(response => {
		console.log(response)
		debugger
	}).catch(error => {
		return error
	})*/
}