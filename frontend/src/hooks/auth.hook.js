import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jWtToken, userId) => {
        setToken(jWtToken);
        setUserId(userId);
        localStorage.setItem('token', JSON.stringify({ userId, jWtToken }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('token'));
        if (data && data.token) {
            login(data.token, data.userId);
        }
        setReady(true);
    }, [login]);

    return { login, logout, ready, token, userId }
}