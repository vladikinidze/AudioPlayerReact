import axios from "axios";
class UserService {
    static async getUserById() {
        const response = await axios.get('https://localhost:7182/api/playlists');
        return response.data;
    }
}

export default UserService;