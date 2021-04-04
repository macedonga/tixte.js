const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	const result = await client.uploadImage("./uploadImage.js", "tixte-is.super-cool.xyz");
	console.log(result);
})()