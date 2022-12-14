import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../component/UI/loginForm";
import RegisterForm from "../component/UI/registerForm";
const Login = () => {
    const type = useParams();
    const toogleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    return (
        <div className="container mt-5">
            <div className="row">
                <div class="col-md-6 offset-md-3 shadow p-4 w-70">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>
                                Allready have account?
                                <a role={"button"} onClick={toogleFormType}>
                                    sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have an account?
                                <a role={"button"} onClick={toogleFormType}>
                                    sign Up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
