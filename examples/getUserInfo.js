const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Fetches the UserInfo of the defined client
	const result = await client.getUserInfo();

	// Log the result to the console
	console.log(result);
})()