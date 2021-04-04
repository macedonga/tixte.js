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
        try {
            const res = await get("https://api.tixte.com/v1/user/uploads/size", {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data;
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Returns the user's uploads
     * @param {Number} amount The amount of uploads to return.
     * @param {Number} page The page of the uploads.
     * @returns 
     */
    async getUploads(amount, page) {
        try {
            if (!amount || typeof (amount) != "number") return new Error(`${amount} is not a valid value for "amount".`);
            if (!page || typeof (page) != "number") return new Error(`${page} is not a valid value for "page".`);

            const res = await get(`https://api.tixte.com/v1/user/uploads?page=${page}&amount=${amount}`, {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data.data;
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Fetches user info
     * @returns User's information
     */
    async getUserInfo() {
        try {
            const res = await get("https://api.tixte.com/v1/users/@me", {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data.data;
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Fetches another user's info
     * @param {String} user The username or user ID of the user
     * @returns User's information
     */
    async getUserInfoByName(user) {
        try {
            const res = await get(`https://api.tixte.com/v1/users/${user}`, {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data.data;
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Fetches the user's domains
     * @returns The user's domains
     */
    async getUserDomains() {
        try {
            const res = await get("https://api.tixte.com/v1/user/domains", {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data;
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Fetches the user's authorized Oauth2 apps
     * @returns The user's authorized Oauth2 apps
     */
    async getUserOauth2Apps() {
        try {
            const res = await get("https://api.tixte.com/v1/user/authorized-applications", {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data;
        } catch (err) {
            return err.response.data;
        }
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

        try {
            let fd = new FormData()
            let file = fs.createReadStream(imagePath, { encoding: 'base64' });
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
        } catch (err) {
            return err.response.data;
        }
    }

    /**
     * Deletes an image
     * @param {String} imageID The ID of the image.
     * @returns Response data from API
     */
    async deleteImage(imageID) {
        if (!imageID || typeof (imageID) != "string") return new Error(`"${imageID}" is not a valid value for "imageID"`);

        try {
            const res = await del(`https://api.tixte.com/v1/user/uploads/${imageID}`, {
                headers: {
                    "Authorization": this.api_key
                }
            });

            return res.data;
        } catch (err) {
            return err.response.data;
        }
    }
}

module.exports = Client;
