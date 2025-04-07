module.exports = new Map(Array.of(
	Array.of("String to object ID", (a_string) => new (require("mongodb").ObjectId)(a_string))))
