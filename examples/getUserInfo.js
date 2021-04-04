const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	const result = await client.getUserInfo();
	console.log(result);
})()