import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const Login = () => {

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const [token, setToken] = useState(localStorage.getItem(localStorage.getItem("token") || false));
    const LOGIN_URL = '/api/User/Login';
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(LOGIN_URL,
                    null, {
                    params: {
                        Username,
                        Password
                    }
                }
            );

            const accessToken = response?.data?.token?.accessToken;
            setUsername('');
            setPassword('');
            localStorage.setItem("token", accessToken);
            localStorage.setItem("authenticated", true);
            navigate("/weather");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else{ 
                setErrMsg('Missing Username or Password');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="Auth">
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter Username"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={Username}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={Password}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" value="Submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                </form>
            </div>
        </div >
    )
};

export default Login;