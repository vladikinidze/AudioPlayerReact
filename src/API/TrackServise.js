import axios from "axios";
class TrackService {
    static async getByPlaylistId(playlistId) {
        const response = await axios.get('https://localhost:7182/api/tracks/playlists/' + playlistId);
        return response.data;
    }
}

export default TrackService;