const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Fetches the UserInfo of the defined Name, in this case "Max"
	const result = await client.getUserInfoByName("max");
	
	// Log the result to the console
	console.log(result);
})()