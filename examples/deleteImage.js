const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	const result = await client.deleteImage("fileID");
	console.log(result);
})()