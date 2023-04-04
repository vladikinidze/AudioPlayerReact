import CurrentTrackInfo from "./CurrentTrackInfo";
import TrackProgress from "./TrackProgress";
import MusicPanel from "./MusicPanel";
function Player() {

    return (
        <div className="bg-[#181818] border-t border-solid border-[#484848] z-40 text-white pb-3 pt-2.5 px-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo />
            <TrackProgress className="grow"/>
            <MusicPanel />
        </div>
    );
}

export default Player;
