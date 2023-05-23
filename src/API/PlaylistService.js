import axios from "axios";
class PlaylistService {
    static async getAll() {
        const response = await axios.get('https://localhost:7182/api/1.0/Playlist');
        return response.data.playlists
    }

    static async getById(playlistId) {
        const response = await axios.get('https://localhost:7182/api/1.0/Playlist/' + playlistId);
        return response.data
    }
}

export default PlaylistService;