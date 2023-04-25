
function PlaylistArtistCard({playlist}) {
    return (
        <div className="pl-8 pr-6 flex flex-col justify-end overflow-hidden h-[230px]">
            <p className="font-semibold text-base uppercase tracking-wide">{playlist.type}</p>
            <p className="text-ellipsis overflow-hidden font-extrabold mb-3 mt-1.5 tracking-wide 5xl:text-7xl 4xl:text-6xl 3xl:text-6xl 2xl:text-5xl xl:text-4xl lg:text-2xl sidebarHide:text-2xl md:text-3xl sm:text-2xl 2l:text-2xl l:text-xl ">{playlist.title}</p>
            <a href="/" className="font-medium text-lg py-1 tracking-wide cursor-pointer hover:underline">{playlist.artist}</a>
            <p className="font-bold text-[#b3b3b3] text-base tracking-wide">{playlist.date}</p>
        </div>
    );
}

export default PlaylistArtistCard;