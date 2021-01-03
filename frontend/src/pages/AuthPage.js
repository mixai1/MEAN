import  React,{ useState } from 'react';

export const AuthPage = () => {
    const [form, setform] = useState({
        email: '',
        password: ''
    });

const changeHandler = (event) => {
    setform({...form, [event.target.name]: event.target.value})
}

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Authorization</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        {/* <span className="card-titel">Authorization</span> */}
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Email"
                                    id="email" type="email"
                                    name="email"
                                />
                                <label htmlfor="email">Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Password"
                                    id="password" type="password"
                                    name="password"
                                />
                                <label htmlfor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-action">
                            <button className="btn yellow darken-4">Login</button>
                            <button className="btn grey lighten-1 black-text">Registration</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
