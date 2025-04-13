/* MongoDB JSON Schema Validator for Events Collection

Key Features:
- Requires 'Public' (visibility flag) and 'Organiser ID' fields
- Defines relational arrays using MongoDB references (objectId)
- Stores binary image data for event photos
- Prevents extra/unvalidated fields (additionalProperties: false)

Fields:
1. Public (Required):
   - Type: boolean
   - Purpose: Determines event visibility

2. Organiser ID (Required):
   - Type: objectId
   - Purpose: Reference to user collection
   - Note: Should be named 'Organiser' per required array

3. Relational Arrays (All optional):
   - Invitations: Unique invitation references
   - Requests: Unique join request references
   - Disscussion [sic] board: Unique message references
   - Notifications: Unique notification references

4. Images:
   - Type: binData array
   - Purpose: Raw image storage
 */



module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An event.",
			required: Array.of("Public", "Organiser"),
			properties: {
				Public: {
					bsonType: "bool",
					description: "Whether or not the event is public."
				},
				Invitations: {
					bsonType: "array",
					description: "The invitations to the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "An invitation to the event."
					}
				},
				Requests: {
					bsonType: "array",
					description: "The requests to join the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A request to join the event."
					}
				},
				"Disscussion board": {
					bsonType: "array",
					description: "The discussion board of the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A message in the discussion board."
					}
				},
				Notifications: {
					bsonType: "array",
					description: "Notifications for the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A notification for the event."
					}
				},
				Images: {
					bsonType: "array",
					description: "Images of the event.",
					items: {
						bsonType: "binData",
						description: "An image of the event."
					}
				},
				"Organiser ID": {
					bsonType: "objectId",
					description: "The organiser of the event."
				}
			},
			additionalProperties: false,
		}
	}
}
