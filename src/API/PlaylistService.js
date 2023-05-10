import axios from "axios";
class PlaylistService {
    static async getAll() {
        try {
            const response = await axios.get('https://localhost:7182/api/playlists');
            return response.data
        }
        catch (e) {
            console.error(e)
        }
    }

    static async getById(playlistId) {
        try {
            const response = await axios.get('https://localhost:7182/api/playlists/' + playlistId);
            return response.data
        }
        catch (e) {
            console.error(e)
        }
    }
}

export default PlaylistService;