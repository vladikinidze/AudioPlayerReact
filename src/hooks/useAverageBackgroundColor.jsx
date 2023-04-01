import {useState} from "react";
import {FastAverageColor} from "fast-average-color";

function useAverageBackgroundColor() {
    const [color, setColor] = useState('indianred');
    function set(ref) {
        const fac = new FastAverageColor();
        fac.getColorAsync(ref.current).then(color => {
            change(color.hex);
        })
    }

    function change(newColor) {
        if (newColor === color) {
            return;
        }
        setColor(newColor);
    }

    return {
        set,
        color
    }
}

export default useAverageBackgroundColor;