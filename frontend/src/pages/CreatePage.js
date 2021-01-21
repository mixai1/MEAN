import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';

export const CreatePage = () => {
    const [link, setLink] = useState(null);
    const { request } = useHttp();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST',
                    { from: link },
                    {
                        authorization: `Bearer ${auth.token}`
                    });
                    console.log(`This is data ${JSON.stringify(data)}`);
                    history.push(`/detail/${data.link._id}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        placeholder="write link"
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    ></input>
                    <label htmlFor="link">Write link</label>
                </div>
            </div>
            <h1>CreatePage</h1>
        </div>
    );
};

