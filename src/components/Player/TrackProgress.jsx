
import {useDispatch, useSelector} from "react-redux";
import {SET_CURRENT_TIME} from "../../actions/playerActions";
import {getFormatCurrentTrackTime} from "../../utils";

function TrackProgress({setTrackProgress}) {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player)

    function onChangeHandle(e) {
        setTrackProgress(e);
        dispatch({type: SET_CURRENT_TIME, payload: e})
    }

    return (
        <div className="grow flex flex-row items-center">
            <p className="text-[10.5px] ml-2 mr-4 mt-0.5 font-light text-[#b3b3b3]">
                {getFormatCurrentTrackTime(player.currentTime)}
            </p>
            <div className="w-full">
                <Range onChange={e => onChangeHandle(e)}
                       thumbSize={9}
                       height={5}
                       width="100%"
                       value={player.currentTime}
                       max={player.duration}
                       thumbColor={{
                           r: 28,
                           g: 185,
                           b: 85,
                           a: 1,
                       }}
                       fillColor={{
                           r: 179,
                           g: 179,
                           b: 179,
                           a: 1,
                       }}
                       trackColor={{
                           r: 56,
                           g: 56,
                           b: 56,
                           a: 1,
                       }}
                />
            </div>
            <p className="text-[10.5px] ml-4 mr-2 mt-0.5 font-light text-[#b3b3b3]">
                {getFormatCurrentTrackTime(player.duration)}
            </p>
        </div>
    );
}

export default TrackProgress;