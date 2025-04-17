export default function(a_sDescription) {
	switch (a_sDescription) {
		case "Success":
			return 200
		case "Invalid":
			return 400
		case "Unauthorised":
			return 401
		case "Not found":
			return 404
		case "Server error":
			return 500
	}
}