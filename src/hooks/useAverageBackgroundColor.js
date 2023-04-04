import {FastAverageColor} from "fast-average-color";

function useAverageBackgroundColor(parentRef) {
    function set(ref) {
        new FastAverageColor()
            .getColorAsync(ref.current)
            .then(color => {
                parentRef.current.style.background = `linear-gradient(to bottom, ${color.hex} ,#121212)`;
            });
    }
    return {
        set,
    }
}

export default useAverageBackgroundColor;