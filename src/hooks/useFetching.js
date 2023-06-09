import {useState} from "react";

function UseFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function fetching() {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            setError(e.response)
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}

export default UseFetching;