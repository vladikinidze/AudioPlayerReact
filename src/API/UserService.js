import axios from "axios";
import {
    error,
    login,
    refToken,
    register,
    root,
    settings,
    user
} from "./Path/path";
import {getToken} from "../utils";

class UserService {
    static async getById(userId) {
        const response = await
            axios.get(root + user + userId);
        return response.data;
    }

    static async login(email, password) {
        const response = await
            axios.post(root + user + login, {email, password});
        return response.data;
    }

    static async register(username, email, password, confirmPassword) {
        const response = await
            axios.post(root + user + register,
                {username, email, password, confirmPassword});
        return response.data;
    }

    static async refreshToken(userId, accessToken, refreshToken) {
        const response = await
            axios.post(root + user + refToken,
                {userId, accessToken, refreshToken})
        return response.data;
    }

    static async getSettings() {
        const token = getToken();
        const response = await axios.get(root + user + settings,
            {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
        return response.data;
    }

    static async postSettings(explicit) {
        const token = getToken();
        const response = await axios.post(root + user + settings,
            {explicit},
            {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
        return response.data;
    }

    static async update(username, email, image, emptyImage) {
        const token = getToken();
        const response = await axios.putForm(root + user,
            {username, email, image, emptyImage},
            {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
        return response.data;
    }

    static async delete(password) {
        const token = getToken();
        const response = await axios.delete(root + user,
            {
                data: {password},
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async report(text) {
        const response = await axios.post(root + user + error, {text},);
        return response.data;
    }
}

export default UserService;