import axios from "axios";
class UserService {
    static async getUserById() {
        try {
            const response = await axios.get('https://localhost:7182/api/playlists');
            return response.data;
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default UserService;