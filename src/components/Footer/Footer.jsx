import CurrentTrackInfo from "./InnerItem/CurrentTrackInfo";
import Player from "./InnerItem/Player";
import MusicPanel from "./InnerItem/MusicPanel/MusicPanel";
function Footer() {

    return (
        <div className="bg-[#181818] border-t border-solid border-[#484848] text-white pb-3 pt-2.5 px-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo />
            <Player className="grow"/>
            <MusicPanel />
        </div>
    );
}

export default Footer;
