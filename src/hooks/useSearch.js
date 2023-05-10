import {useState} from "react";


function UseSearch() {
    const [query, setQuery] = useState("");

    function onSearching(query) {
        console.log(query)
        setQuery(query);
    }

    return {
        query,
        onSearching
    }
}

export default UseSearch;