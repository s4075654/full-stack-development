// Change to use request body parameters
interface QueryParams {
	username?: string
	email?: string
	admin?: boolean
}

export default function(bodyParams: QueryParams) {
	const filter: Record<string, string | boolean> = {}
	if (bodyParams.username) filter.username = bodyParams.username
	if (bodyParams.email) filter["Email address"] = bodyParams.email
	if (typeof bodyParams.admin !== 'undefined') filter.admin = Boolean(bodyParams.admin)
	return filter
}