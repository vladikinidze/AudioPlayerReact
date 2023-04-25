export const MIN_DESKTOP_WIDTH = 900;

let debounceTimer = null;

export function debounce(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

export function getFormatCurrentTrackTime(current) {
    const minutes = Math.floor(current / 60).toString().padStart(2, '0');
    const seconds = (current % 60).toFixed(0).toString().padStart(2, '0');
    return minutes + ":" + seconds;
}