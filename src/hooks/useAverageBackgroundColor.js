import {FastAverageColor} from "fast-average-color";

function useAverageBackgroundColor(parentRef) {
    function set(ref) {
        new FastAverageColor()
            .getColorAsync(ref.current)
            .then(color => {
                parentRef.current.style.background = `linear-gradient(170deg, ${color.hex}, 30% ,#121212)`;
            });
    }
    return {
        set,
    }
}

export default useAverageBackgroundColor;