const Tixte = require("../index.js");
const client = new Tixte(require("./config.json"));

(async () => {
	// Delete the image with the specified fileID (____.png,gif,jpeg)
	const result = await client.deleteImage("fileID");

	// Log the result to the console
	console.log(result);
})()