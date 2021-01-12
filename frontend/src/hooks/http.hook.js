import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setloading(true);
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type']= 'application/Json';
        }
        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();
            console.log('data', data)
            console.log(response);

            if (!response.ok) {
                throw new Error(data.message || "Error");
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

    return { loading, request, error, clearError }
}
