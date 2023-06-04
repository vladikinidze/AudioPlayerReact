export const MIN_DESKTOP_WIDTH = 900;

let debounceTimer = null;

export function debounce(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

export function getFormatTime(current) {
    if (current === undefined) {
        return "00:00";
    }
    const minutes = Math.floor(current / 60).toString().padStart(2, '0');
    let seconds = (current % 60).toFixed(0).toString().padStart(2, '0');
    return minutes + ":" + seconds;
}

export function getFormatDate(string) {
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
    };
    return  new Date(string).toLocaleString("ru", options);
}

export function isEquals(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function getObjectIndex(object, objects) {
    return Object.values(objects).findIndex((elem) => elem.id === object.id)
}

export const styles = [
    "",
    "hidden sm:block",
    "hidden lg:block",
    "hidden xl:block",
    "hidden 2xl:block",
    "hidden 3xl:block",
    "hidden 4xl:block",
    "hidden 5xl:block",
    "hidden 6xl:block"
];

export function getToken() {
    return JSON.parse((sessionStorage.getItem("auth") ?? localStorage.getItem("auth")))?.accessToken;
}
