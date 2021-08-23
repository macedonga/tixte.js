const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Fetch the userDomains of the client
	const result = await client.getUserDomains();

	// Log the result to the console
	console.log(result);
})()