import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        // console.log(` Url:${url} Body: ${body} method: ${method}`);
        setloading(true);
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type']= 'application/Json';
        }
        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error respose");
            }
            setloading(false);
            setSuccess(data.message);
            return data;
        } catch (e) {
            setloading(false);
            setError(e.message);
        }
    }, []);
    const clearError = useCallback(() => { setError(null); },[]);
    const clearSuccess = useCallback(()=>{setSuccess(null);},[]);

    return { loading, request, error, success,clearSuccess, clearError }
}
