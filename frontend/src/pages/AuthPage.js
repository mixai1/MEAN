import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const authContext = useContext(AuthContext);
    const { loading, request, error, success,
        clearSuccess, clearError } = useHttp();
    const message = useMessage();
    const [form, setform] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        message(success);
        clearSuccess();
        clearError();
    }, [error, message, success, clearSuccess, clearError]);

    const changeHandler = (event) => {
        setform({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        await request('/api/auth/register', 'POST', { ...form });
    }

    const loginHandler = async () => {
        const data = await request('/api/auth/login', 'POST', { ...form });
        authContext.login(data.token, data.userId);
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Authorization</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Email"
                                    id="email" type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Password"
                                    id="password" type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlfor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-action">
                            <button
                                onClick={loginHandler}
                                disabled={loading}
                                className="btn yellow darken-4">
                                Login
                                </button>
                            <button
                                onClick={registerHandler}
                                disabled={loading}
                                className="btn grey lighten-1 black-text">
                                Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
