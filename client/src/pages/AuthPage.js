import React, {useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request,error,clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message , clearError] )

    useEffect (() => {
        window.M.updateTextFields() 
    } ,[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
            message(data.message)
        } catch (e) {}
    };

    const loginHandler = async () => {
        try{
            const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)

        } catch (e) {}
    }
    

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Введіть email" 
                                id="email" 
                                type="email" 
                                name="email"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Введіть пароль" 
                                id="password" 
                                type="password"
                                name="password"
                                className="yellow-input" 
                                value={form.password}
                                onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled ={loading}
                            >Ввійти</button>
                            <button className="btn green darken-4"
                            onClick={registerHandler}
                            disabled ={loading}
                            >Реєстрація</button>
                        </div>
                </div>
            </div>
        </div>
    )
} 