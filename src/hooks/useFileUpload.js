import {useState} from "react";

function UseFileUpload() {

    const [file, setFile] = useState();

    function upload(file) {
        setFile(file);
    }

    return {
        file,
        upload
    };
}

export default UseFileUpload;