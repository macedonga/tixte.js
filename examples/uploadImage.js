const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Upload an image to the Tixte account in the directory to a specified domain
	// ! Remember, this domain must be associated with the Tixte account at hand!
	const result = await client.uploadImage("./uploadImage.js", "tixte-is.super-cool.xyz");

	// Log the result to the console
	console.log(result);
})()