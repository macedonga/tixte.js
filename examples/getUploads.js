const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Fetch the defined amount of uploads on the defined page of the Browse tab
	const result = await client.getUploads(50, 1);

	// Log the result to the console
	console.log(result);
})()