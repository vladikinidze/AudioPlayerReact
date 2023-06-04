import {Link} from "react-router-dom";
import {BiHeart} from "react-icons/bi";
import useFetching from "../../hooks/useFetching";
import TrackService from "../../API/TrackService";
import {useEffect, useState} from "react";
import UserService from "../../API/UserService";
import {FaHeart} from "react-icons/fa";
import {useSelector} from "react-redux";

function CurrentTrackInfo({image, title, user, trackId, averageColor}) {
    const [favorite, setFavorite] = useState();
    const userReducer = useSelector(state => state.user);
    const player = useSelector(state => state.player);
    const [refreshToken, isRefreshTokenLoading, refreshTokenError] = useFetching(async () => {
        let storage = localStorage.getItem("auth") ?? sessionStorage.getItem("auth")
        if (storage) {
            storage = JSON.parse(storage);
            const response = await UserService.refreshToken(storage.userId, storage.accessToken, storage.refreshToken);
            if (localStorage.getItem("auth")) {
                localStorage.setItem("auth", JSON.stringify(response));
            } else {
                sessionStorage.setItem("auth", JSON.stringify(response));
            }
        }
    });

    const [addToFavorite, addLoading, addError] = useFetching(async () => {
        if (favorite) {
            const response = await TrackService.deleteFromFavorite(trackId);
        } else {
            const response = await TrackService.addToFavorite(trackId);
        }
        isFavorite();
    });

    const [isFavorite, isFavoriteLoading, isFavoriteError] = useFetching(async () => {
        const response = await TrackService.isFavorite(trackId);
        setFavorite(response);
    });

    useEffect(() => {
        if (userReducer?.guid) {
            isFavorite();
        }
    }, [player.active])

    useEffect(() => {
        if (addError) {
            if (addError.status === 401) {
                refreshToken();
                addToFavorite();
            }
        }
    }, [addError])

    useEffect(() => {
        if (isFavoriteError) {
            if (isFavoriteError.status === 401) {
                refreshToken();
                isFavorite();
            }
        }
    }, [isFavoriteError])


    return (
        <div className="flex flex-row items-center justify-between w-[250px]">
            <div className="flex flex-row items-center">
                <img src={`${image ? "https://localhost:7182/api/1.0/File/" + image : ""}`}
                     className="w-[65px] h-[65px] rounded-sm mt-0.5"
                     id="currentTrackImage"
                     alt=""/>
                <div className="flex flex-col ml-5 max-w-[120px]">
                    <p className="text-sm font-semibold mb-0.5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
                        {title}
                    </p>
                    <p className="text-xs font-light text-[#b3b3b3]">
                        {user.username}
                    </p>
                    {/*<Link to={`/users/${user.id}`}*/}
                    {/*      className="text-xs font-light text-[#b3b3b3] hover:underline cursor-pointer">*/}
                    {/*    {user.username}*/}
                    {/*</Link>*/}
                </div>
            </div>
            <button onClick={addToFavorite}>
                {favorite
                    ? <FaHeart className="w-5 h-5 fill-[#1cb955] mr-0.5"/>
                    : <BiHeart className="w-6 h-6 fill-[#b3b3b3] hover:fill-[#1cb955]"/>
                }

            </button>
        </div>
    );
}

export default CurrentTrackInfo;