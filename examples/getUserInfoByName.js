const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	const result = await client.getUserInfoByName("max");
	console.log(result);
})()