import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../components/utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching data
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setData(res);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError("Something went wrong!", err.message);
                setLoading(false); // Set loading to false if there's an error
            });
            
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
