import axios from "axios";
class FileService {
    static getFile(filename) {
        return "https://localhost:7182/api/files/" + filename;
    }
}

export default FileService;