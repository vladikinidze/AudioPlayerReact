import classes from "./FileUpload.module.css";
import {useEffect, useRef} from "react";
import Button from "../Button";
import Audio from "../Audio";
import FileService from "../../../API/FileService";
import {plug} from "../../../API/Path/path";

function FileUpload({icon, fileUpload, wrapperClassName, callback, type, filepath}) {
    const fileRef = useRef();

    useEffect(() => {
        if (fileUpload.file === FileService.getFile(plug)) {
            fileRef.current.src = fileUpload.file;
        }
    }, [fileUpload.file])


    useEffect(() => {
        if (fileRef.current) {
            fileRef.current.src = FileService.getFile(filepath);
            fileUpload.upload(FileService.getFile(filepath));
        }
    }, [filepath])

    function onChanged(event) {
        if (event.target.files[0]) {
            fileUpload.upload(event.target.files[0])
            if (callback) {
                callback();
            }
            if (type === "image") {
                fileRef.current.src = URL.createObjectURL(event.target.files[0]);
            } else {
                previewFile(event.target.files[0])
            }
        }
    }
    function previewFile(file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            fileRef.current.src = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        type === "image"
            ?
            <div className={`${classes.uploadImage} ${wrapperClassName} mx-auto`}>
                <img ref={fileRef}
                     className={classes.imgImage}
                     src=""
                     alt=""/>
                <div className={classes.roundImage}>
                    <div className={classes.innerImage}>
                        <input className={classes.fileImage}
                               type="file"
                               onInput={onChanged}
                               accept=".jpg,.jpeg"
                        />
                        {icon}
                    </div>
                </div>
            </div>
            :
            <div className={`${classes.uploadAudio} ${wrapperClassName} pt-3 mx-auto`}>
                <Button primary
                        className={`${classes.uploadButton} bg-gray-100 hover:bg-[#1cb955] mb-3 hover:text-white`}>
                    Загрузить аудио
                    {icon}
                    <input className={classes.fileAudio}
                           type="file"
                           onInput={onChanged}
                           accept=".mp3"/>
                </Button>
                {(fileUpload.file || filepath) &&
                    <Audio ref={fileRef} className="w-[440px]"/>
                }
            </div>
    );
}

export default FileUpload;