import axios from "axios";
import {
    addPlaylist, deletePlaylist, favorite,
    isAdded,
    playlist,
    root,
    user
} from "./Path/path";
import {getToken} from "../utils";

class PlaylistService {
    static async getAll() {
        const token = getToken();
        const response = await axios.get(root + playlist,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data.playlists
    }

    static async getUserPlaylists(userId) {
        const response = await axios.get(root + playlist + user + '/' + userId);
        return response.data;
    }

    static async getById(playlistId) {
        const token = getToken();
        const response = await axios.get(root + playlist + '/' + playlistId,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data
    }

    static async getFavorite() {
        const token = getToken();
        const response = await axios.get(root + playlist + user + favorite,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data
    }

    static async create(title, isPrivate, image) {
        const token = getToken();
        const response = await axios.postForm(root + playlist,
            {title, private: isPrivate, image},
            {
                headers: {
                    "Content-type": "multipart/form-date",
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async update(id, title, isPrivate, image, emptyImage) {
        const token = getToken();
        const response = await axios.putForm(root + playlist,
            {id, title, private: isPrivate, image, emptyImage},
            {
                headers: {
                    "Content-type": "multipart/form-date",
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async delete(id) {
        const token = getToken();
        const response = await axios.delete(root + playlist + '/' + id,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async addPlaylist(id) {
        const token = getToken();
        const response = await axios.post(root + playlist + user + addPlaylist + '/' + id, {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async deletePlaylist(id) {
        const token = getToken();
        const response = await axios.delete(root + playlist + user + deletePlaylist + '/' + id,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async isAdded(playlistId) {
        const token = getToken();
        if (!token) {
            return false;
        }
        const response = await axios.get(root + playlist + user + isAdded + '/' + playlistId,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }
}

export default PlaylistService;