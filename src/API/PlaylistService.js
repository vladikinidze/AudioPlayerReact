import axios from "axios";
class PlaylistService {
    static async getAll() {
        const response = await axios.get('https://localhost:7182/api/playlists');
        return response.data
    }

    static async getById(playlistId) {
        const response = await axios.get('https://localhost:7182/api/playlists/' + playlistId);
        return response.data
    }
}

export default PlaylistService;