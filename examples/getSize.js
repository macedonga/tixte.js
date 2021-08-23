const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Fetch the total size of all uploads in the Tixte account
	const result = await client.getSize();

	// Log the result to the console
	console.log(result);
})()