import {FastAverageColor} from "fast-average-color";

function useAverageBackgroundColor(parentRef) {
    function set(ref) {
        new FastAverageColor()
            .getColorAsync(ref.current)
            .then(color => {
                parentRef.current.style.background = `linear-gradient(170deg, ${color.hex}, 30% ,#121212)`;
            })
            .catch(e => {
                console.error(e)
            });
    }

    function setColor(color) {
        parentRef.current.style.background = `linear-gradient(170deg, ${color}, 30% ,#121212)`;
    }

    return {
        set,
        setColor
    }
}

export default useAverageBackgroundColor;