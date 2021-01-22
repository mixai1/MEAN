import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { LinkCart} from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null,
                { Authorization: `Bearer ${token}` });
            setLink(data);
        } catch (error) {
            console.log(error);
        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            {!loading && link && <LinkCart link= {link} />}
        </div>
    );
}
