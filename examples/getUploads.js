const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	const result = await client.getUploads(50, 1);
	console.log(result);
})()