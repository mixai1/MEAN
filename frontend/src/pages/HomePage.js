import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ListLinks } from '../components/ListLinks';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const HomePage = () => {
    const [links, setLinks] = useState([]);
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/link/', 'GET', null,
                { Authorization: `Bearer ${token}` });
            setLinks(data);
        } catch (error) {
            console.log(error);
        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks])

    if (loading) {
        return (<Loader />);
    }

    return (
        <div className="container">
          {!loading && <ListLinks links = {links}/>}
        </div>
    );
}
