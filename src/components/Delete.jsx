import Button from "./UI/Button";
import useFetching from "../hooks/useFetching";
import TrackService from "../API/TrackService";
import PlaylistService from "../API/PlaylistService";
import {useNavigate} from "react-router-dom";

function Delete({track = null, playlist = null, changed, modal}) {
    const navigate = useNavigate();
    const [deleteObject, deleteLoading, deleteError] = useFetching(async () => {
        if (track) {
            const response = await TrackService.delete(track?.id, track?.playlistId);
        } else if (playlist) {
            const response = await PlaylistService.delete(playlist?.id);
            navigate("/");
        }
        modal.close();
        if (changed) {
            changed(prev => !prev);
        }
    });

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8 break-all hyphens-auto overflow-hidden">
                Удалить {track ? 'трек' : 'плейлист'}"
            </p>
            <div className="flex flex-row items-center justify-center mb-2">
                <Button onClick={() => modal.close()}>
                    Отмена
                </Button>
                <Button primary className="bg-gray-100 hover:bg-[#1cb955] hover:text-white" onClick={deleteObject}>
                    Удалить
                </Button>
            </div>
        </div>
    );
}

export default Delete;