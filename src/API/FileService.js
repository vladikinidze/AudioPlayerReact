import {download, file, root} from "./Path/path";
import {getToken} from "../utils";
import axios from "axios";

class FileService {
    static getFile(filename) {
        return root + file + filename;
    }

    static async downloadFile(filename) {
        const token = getToken();
        const response = await axios.get(root + file + download + filename, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        console.log(response.data)
        return response.data;
    }
}

export default FileService;