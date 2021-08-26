const { get, post, delete: del } = require("axios");
const FormData = require("form-data");
const fs = require("fs");

class Client {
    constructor(options) {
        if (!options.api_key) throw new Error('"api_key" cannot be undefined');

        this.api_key = options.api_key;
    }

    /**
     * Gets the size of the uploaded data by the user.
     * @returns The size of the user's uploads.
     */
    async getSize() {
        const res = await get("https://api.tixte.com/v1/users/@me/uploads/size", {
            headers: {
                "Authorization": this.api_key
            }
        });

        return res.data;
    }

    /**
     * Returns the user's uploads
     * @param {Number} amount The amount of uploads to return.
     * @param {Number} page The page of the uploads.
     * @returns
     */
    async getUploads(amount, page) {
        if (!amount || typeof (amount) != "number") return new Error(`${amount} is not a valid value for "amount".`);
        if (!page || typeof (page) != "number") return new Error(`${page} is not a valid value for "page".`);

        const res = await get(`https://api.tixte.com/v1/users/@me/uploads?page=${page}&amount=${amount}`, {
            headers: {
                "Authorization": this.api_key
            }
        });

        return res.data.data;
    }

    /**
     * Fetches user info
     * @returns User's information
     */
    async getUserInfo() {
        const res = await get("https://api.tixte.com/v1/users/@me", {
            headers: {
                "Authorization": this.api_key
            }
        });

        return res.data.data;
    }

    /**
     * Fetches another user's info
     * @param {String} user The username or user ID of the user
     * @returns User's information
     */
    async getUserInfoByName(user) {
        const res = await get(`https://api.tixte.com/v1/users/${user}`, {
            headers: {
                "Authorization": this.api_key
            }
        });

        return res.data.data;
    }

    /**
     * Fetches the user's domains
     * @param {String} token Token from the Tixte cookie.
     * @returns The user's domains
     */
    async getUserDomains() {
        const res = await get("https://api.tixte.com/v1/users/@me/domains", {
            headers: {
                "Authorization": this.api_key
            }
        });

        return res.data;
    }

    /**
     * Uploads an image
     * @param {Number} imagePath Path of the image to upload.
     * @param {Number} domain The domain to upload the image to.
     * @returns Response data from API
     */
    async uploadImage(imagePath, domain) {
        if (!imagePath || typeof (imagePath) != "string") return new Error(`"${imagePath}" is not a valid value for "imagePath"`);
        if (!domain || typeof (domain) != "string") return new Error(`"${domain}" is not a valid value for "domain"`);

        let fd = new FormData()
        let file = fs.createReadStream(imagePath);
        fd.append("file", file)

        const res = await post("https://api.tixte.com/v1/upload", fd, {
            headers: {
                "Authorization": this.api_key,
                "domain": domain,
                "Content-Type": "multipart/form-data",
                ...fd.getHeaders()
            },
            data: fd
        });

        return res.data;
    }

    /**
     * Deletes an image
     * @param {String} imageID The ID of the image.
     * @returns Response data from API
     */
    async deleteImage(imageID) {
        if (!imageID || typeof (imageID) != "string") return new Error(`"${imageID}" is not a valid value for "imageID"`);

         const res = await del(`https://api.tixte.com/v1/users/@me/uploads/${imageID}`, {
            headers: {
                "Authorization": this.api_key
            }
         });

         return res.data;
    }
}

module.exports = Client;
