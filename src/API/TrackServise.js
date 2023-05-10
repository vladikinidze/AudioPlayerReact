import axios from "axios";
class TrackService {
    static async getByPlaylistId(playlistId) {
        try {
            const response = await axios.get('https://localhost:7182/api/tracks/playlists/' + playlistId);
            return response.data;
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default TrackService;