import axios from "axios";
import {addToFavorite, deleteFromFavorite, isFavorite, playlist, root, track, user} from "./Path/path";
import {getToken} from "../utils";

class TrackService {

    static async getAll() {
        const token = getToken();
        const response = await axios.get(root + track,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data.tracks;
    }

    static async getById(trackId, playlistId) {
        const token = getToken();
        const response = await axios.get(root + track,
            {trackId, playlistId},
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async getByPlaylistId(playlistId) {
        const token = getToken();
        const response = await axios.get(root + track + playlist +  '/' + playlistId,
            token && {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async create(title, explicit, playlistId, audio, duration) {
        const token = getToken();
        const response = await axios.postForm(root + track,
            {title, explicit, playlistId, audio, duration},
            {
                headers: {
                    "Content-type": "multipart/form-date",
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async update(id, title, explicit, playlistId, audio, duration) {
        const token = getToken();
        const response = await axios.putForm(root + track,
            {id, title, explicit, playlistId, audio, duration},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async delete(id, playlistId) {
        const token = getToken();
        const response = await axios.delete(root + track,
            {
                data: {id, playlistId},
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async addToFavorite(trackId) {
        const token = getToken();
        const response = await axios.post(root + track + user + addToFavorite + "/" + trackId, {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async deleteFromFavorite(trackId) {
        const token = getToken();
        const response = await axios.delete(root + track + user + deleteFromFavorite + "/" + trackId,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }

    static async isFavorite(trackId) {
        const token = getToken();
        const response = await axios.get(root + track + user + isFavorite + '/' + trackId,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response.data;
    }
}

export default TrackService;