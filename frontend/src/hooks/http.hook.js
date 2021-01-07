import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const req = useCallback(async (url = '', method = 'GET', body = null, headers = {}) => {
        setloading(true);
        try {
            const res = await fetch(url, { method, body, headers });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.massage);
            }
            setloading(false);

            return data;
        } catch (e) {
            setloading(false);
            setError(e.massage);
            throw e;
        }
    }, []);
    const clearError = () => { setError(null); }

    return { loading, req, error, clearError }
}
