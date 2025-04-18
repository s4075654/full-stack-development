import g_coExpress from "express"
const g_coRouter = g_coExpress.Router()

import g_cookieParser from "cookie-parser"
import g_coDb from "../server/db.ts"

const g_coUsers = g_coDb.collection("users")
await g_coUsers.createIndex({ username: 1 }, { unique: true })

import g_coBcrypt from "bcrypt"
import "dotenv/config"
import g_codes from "../server/statuses.ts"


//g_coApp.use(g_coExpress.json());
// HTTP methods for the user operations in this Express router

g_coRouter.post("/", async function (a_oRequest, a_oResponse) {
   // console.log("Request body:", a_oRequest.body); // Log request body
   /*EXAMPLE
   //Request body: {
  username: 'Huy Mai2',
  password: 'examplePASSWORD123!',
  email: 'fallsgravity437@gmail.com' 
}*/
	const { username, password, email } = a_oRequest.body;

	// Validate required fields Correct
	if (!username || !password || !email) {
		return a_oResponse.status(g_codes("Invalid")).json({ error: "Missing required fields" });
	}

	try {
		// Existing user check  Correct
		const existingUser = await g_coUsers.findOne({
			$or: [
				{ username },
				{ "Email address": email }
			]
		});

		// Conflict handling  Correct
		if (existingUser) {
			return a_oResponse.status(g_codes("Conflict")).json({ 
				error: existingUser.username === username 
					? "Username already exists" 
					: "Email already registered"
			});
		}

		// User creation  Schema-compliant
		await g_coUsers.insertOne({
			username,
			password: await g_coBcrypt.hash(
				password, 
				parseInt(process.env.m_saltRounds) //  Ensure SALT_ROUNDS is numeric
			),
			"Email address": email, //  Matches schema
			admin: false, //  Default non-admin
			notifications: [],
			"Organising events": [],
			sessions: []
		});

		a_oResponse.sendStatus(g_codes("Created")); //  Correct success status
	} catch (error) {
		// Add duplicate key check
		if (error.code === 11000) {
			return a_oResponse.status(g_codes("Conflict")).json({ 
				error: "Username/email already exists" 
			});
		}
		console.error("Registration error:", error);
		a_oResponse.status(g_codes("Server error")).json({ error: "Server error during registration" });
	  
		  console.error("Validation errors:", error.errInfo.details.schemaRulesNotSatisfied);
	}
});
import g_coFilter from "../filters/UserFilter.ts"

// GET Route update
g_coRouter.get("/", async function(req, res) {
	try {
		const results = await g_coUsers.find(
			g_coFilter(req.body) // Use body instead of cookies
		).toArray();
		res.status(g_codes("Success")).json(results);
	} catch (error) {
		res.status(g_codes("Server error")).json(error);
	}
});

// PUT Route update
g_coRouter.put("/", async function(req, res) {
	try {
		await g_coUsers.updateMany(
			g_coFilter(req.body),
			{ $set: {
				username: req.body.username,
				password: await g_coBcrypt.hash(
					req.body.password, 
					parseInt(process.env.SALT_ROUNDS)
				),
				"Email address": req.body.email,
				admin: Boolean(req.body.admin)
			} 
		});
		res.sendStatus(g_codes("Success"));
	} catch (error) {
		res.status(g_codes("Server error")).json(error);
	}
});


g_coRouter.delete("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	try {
		await g_coUsers.deleteMany(await g_coFilter(a_oRequest.cookies))
	} catch (a_oError) {
		a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
	a_oResponse.sendStatus(g_codes("Success"))
})

export default g_coRouter